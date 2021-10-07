import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useEffect, useState} from 'react'
import axios from 'axios'

import {BookList} from './components/BookList/BookList'
import{Home} from './components/Home'
import { AddBook } from './components/BookList/AddBook';
import { Register } from './components/Auth/Register';
import GlobalState from './context/GlobalState'
import { Login } from './components//Auth/Login';
import { BookDetail } from './components/BookNotes/BookDetail';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined
  })

  const [bookList, setBookList] = useState([])

  

  useEffect(()=>{

    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post(
        '/users/tokenIsValid',
        null,
        {headers: {'x-auth-token':token}}
      );
      if (tokenRes.data) {
        const userRes = await axios.get('/users', 
          {headers: {'x-auth-token':token},}
        );
        setUserData({
          token,
          user: userRes.data,
        })

      }
    }

    checkLoggedIn();
    
  }, [])

  return (
    <>
    <Router>
      <GlobalState.Provider value={{userData, setUserData, bookList, setBookList}}>
        <Switch>
          <Route path='/' exact component = {Home} />
          <Route exact path='/Register' component={Register} />
          <Route exact path='/Login' component={Login} />
          <Route exact path ='/BookList' component={BookList} />
          <Route exact path = '/AddBook' component = {AddBook} />
          <Route exact path = '/:id' 
            render={(props) => <BookDetail {...props}/>}/>
        </Switch>
      </GlobalState.Provider>
    </Router>
    </>
  );
}

export default App;
