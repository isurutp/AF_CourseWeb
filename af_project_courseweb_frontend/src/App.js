import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginComponent from "./Components/Login_Component" ;
import RegisterComponent from "./Components/Register_Component" ;
import HomeComponent from "./Components/Home_Component" ;
import StudentProfile from "./Components/Student_Profile_Component" ;
import Admin_profile from "./Components/Admin/Admin_profile_component";
import Instructor_profile from "./Components/Instructor/Instructor_Profile_Component";


import { Layout } from './styles/Layout';
import { NavigationBar } from './styles/NavigationBar';
import { Jumbotron } from './styles/Jumbotron';

class App extends Component {
  render() {
    return (
        <React.Fragment>
          <Router>
            <NavigationBar />
            <Jumbotron />
            <Layout>
              <Switch>
                <Route path="/home" exact component={HomeComponent}/>
                <Route path="/register" component={RegisterComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/student_profile" component={StudentProfile}/>
                <Route path="/admin_profile" component={Admin_profile}/>
                <Route path="/instructor_profile" component={Instructor_profile}/>
              </Switch>
            </Layout>
          </Router>
        </React.Fragment>
    );
  }
}

export default App;
