import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import Home from "./components/Home";
import About from './components/About';
import Jobs from './components/Jobs';
import Contact from './components/Contact';
import ErrorPage from './components/ErrorPage';

function App() {
  return ( 
  <div className= "App">
  <Router>
  {/* <Login/> */}
  <Routes>
    
  <Route path = "/" element = {<Login/>}></Route>
  <Route path = "/Home" element = {<Home/>}></Route>
  <Route path = "/Jobs" element = {<Jobs/>}></Route>
  <Route path = "/about" element = {<About/>}></Route>
  <Route path = "/contact" element = {<Contact/>}></Route>
  </Routes>
  </Router>
  </div>

  );
  }

export default App;
