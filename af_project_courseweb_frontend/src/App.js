import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginComponent from "./Components/Login_Component" ;
import RegisterComponent from "./Components/Register_Component" ;
import HomeComponent from "./Components/Home_Component" ;
import StudentProfile from "./Components/Student_Profile_Component" ;
import InstructorProfile from "./Components/Instructor/Instructor_Profile_Component";

import './App.css';


function App() {
  return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <Link to="/" className="navbar-brand">CourseWeb</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">Login</Link>
                </li>
              </ul>
            </div>

          </nav>
          <Route path="/" exact component={HomeComponent}/>
          <Route path="/register" component={RegisterComponent}/>
          <Route path="/login" component={LoginComponent}/>
          <Route path="/student_profile" component={StudentProfile}/>
          <Route path = "/instructor_profile" component = {InstructorProfile}/>
        </div>
      </Router>
  );
}

export default App;
