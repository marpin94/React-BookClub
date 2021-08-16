const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')
const User = require('../models/users.model')



//REGISTER ROUTE

router.post('/register', async(req,res) =>{
    try{
        const {email, password, passwordCheck, username} = req.body

        //validate
        if (!email || !password || !passwordCheck)
            return res.status(400).json({msg: 'Please fill out all fields'})

        if (password.length < 5)
            return res.status(400).json({msg:'Password must be at least 5 characters long'})
        
        if (password !== passwordCheck)
            return res.status(400).json({msg: 'Password does not match'})

        const existingUser = await User.findOne({email: email})
        if (existingUser)
            return res.status(400).json({msg: 'Account with this email already exists'})
        if (!username) username = email

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt)

        const newUser = new User({
            email,
            password: passwordHash,
            username,    
        });

        const savedUser = await newUser.save()
        res.json(savedUser)

    } catch(err) {
        res.status(500).json({error: err.message})
    }
});

//LOGIN ROUTE

router.post('/login', async(req,res) => {
    try{
        const {email, password} = req.body;

        //validate
        if (!email || !password)
            return res.status(400).json({msg: 'Please fill out all fields'})
        
        //Find User

        const user = await User.findOne({email:email})
        if (!user)
            return res.status(400).json({msg: 'No account with this email exists'})

        //Match PW

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({msg: 'Invalid Credentials'})

        //Token

        const token = jwt.sign({id: user._id}, process.env.JWT_TOKEN )
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.username,
            }
        });

    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

// DELETE USER ROUTER

router.delete('/delete', auth, async( req, res) => {
    try{
        const deletedUser = await User.findByIdAndDelete(req.user)
        res.json(deletedUser)

    } catch(err) {
        res.status(500).json({error: err.message})
    }
})


// TOKEN IS VALID 

router.post('/tokenIsValid', async(req,res) => {
    try{
        const token = req.header('x-auth-token')
        if(!token) {
            return res.json(false);
        } else {
        const verified = jwt.verify(token, process.env.JWT_TOKEN)
        if(!verified)
            return res.json(false);

        const user = await User.findById(verified.id);
        if (!user)
            return res.json(false);
        
            return res.json(true)
        }
    } catch(err) {
        res.status(500).json({error: err.message})
    }
})

router.get('/', auth, async (req,res) => {
    const user = await User.findById(req.user)
    res.json({
        displayName: user.username,
        id: user._id
    })
})

module.exports = router