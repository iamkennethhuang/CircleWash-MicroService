import React, {useState} from 'react';
import HomePage from './components/home/index';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ContactUs from './components/contactUs/index';
import Support from './components/support/index'
import SignIn from './components/signIn/index';
import SignUp from './components/signUp/index';
import Profile from './components/profile/index';
import NavBar from './components/navBar/navbar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        {/* auth={auth} setAuth={setAuth} */}
        <Route path='/' exact element={<HomePage />} />
        <Route path='/contactus' exact element={<ContactUs />} />
        <Route path='/support' exact element={<Support />} />
        <Route path='/signup' exact element={<SignUp />}/>
        <Route path='/signin' exact element={<SignIn />} />
        <Route path='/profile' exact element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

