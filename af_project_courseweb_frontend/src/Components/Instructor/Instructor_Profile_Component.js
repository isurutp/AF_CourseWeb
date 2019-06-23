import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import instructor_courses from "./My_Courses_Instructor_Component";
import add_assignment from "./Add_Assignment_Component";
import view_assignment from "./View_Assignments_Component";

export default class Instructor_Profile extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <Router>
                <div>
                    <br/>
                    <h3>Instructor Profile</h3>
                    <nav>
                    <Link to={'/instructor_courses'}><label>My Courses</label></Link> | <label/>
                    </nav>
                    <Route exact path={'/instructor_courses'} component={instructor_courses}/>
                    <Route exact path={'/add_assignment/:id'} component = {add_assignment}/>                
                    <Route exact path={'/view_assignment/:id'} component = {view_assignment}/>                
                </div>
            </Router>
        )
    }
}