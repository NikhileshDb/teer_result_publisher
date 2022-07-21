import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CommonNumberScreen from '../presentation/CommonNumber/CommonNumber';
import HomeScreen from '../presentation/Home/HomeScreen';
import NavBar from '../GlobalComponents/NavBar';
import LoginScreen from '../presentation/authentication/Login/Login';
import React from 'react'
import { auth, useAuth } from "../services/firebase";


function URLS() {
const currentUser = useAuth();

  return (
    <Router>
    <div className="flex flex-row">
      <NavBar auth={auth} />
    <Routes>
        {currentUser ?   <Route path="/" element={<HomeScreen />}  />:""}
        {currentUser ?  <Route exact path="/common-number" element={<CommonNumberScreen  />} /> : ""}
       
        <Route exact path="/login" element={<LoginScreen auth={auth} />} />
    </Routes>


    </div>
  </Router>
  )
}

export default URLS