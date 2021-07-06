import React,{useState} from 'react';
import ListBooks from './components/ListBooks';
import MyBooks from './components/MyBooks'
import AddBook from './components/AddBook';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import MyBorrows from './components/MyBorrows';
import Login from './components/Login';
import AddUser from './components/AddUser';
import Header from './components/Header'

import 'bootstrap/dist/css/bootstrap.min.css'


function App  () {

  const [userInfo, setUserInfo] = useState('');

  return (
    <div>
      
    <BrowserRouter>
    <div className="container">
       {!userInfo &&  <Redirect to="/login"/> }
       {userInfo &&  <Header userInfo={userInfo} setUserInfo={setUserInfo} /> }
        <Route  path="/listBooks">
          <ListBooks />
        </Route>
        <Route exact path="/myBooks">
          <MyBooks />
        </Route>
        <Route exact path="/addBook">
          <AddBook />
        </Route>
        <Route exact path="/addBook/:bookId">
          <AddBook />
        </Route>
        <Route path="/myBorrows">
          <MyBorrows />
        </Route>
        <Route path="/login">
          <Login setUserInfo={setUserInfo} />
        </Route>
        <Route path="/addUser">
          <AddUser setUserInfo={setUserInfo} />
        </Route>

    </div>
  </BrowserRouter>
</div>
    
  );
};

export default App;