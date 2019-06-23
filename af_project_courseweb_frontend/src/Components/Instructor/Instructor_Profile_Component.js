import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

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
                    <Link to={'/'}><label>My Courses</label></Link> | <label/>
                    <Link to={'/'}><label>View All Assignments</label></Link>
                    </nav>
                </div>
            </Router>
        )
    }
}