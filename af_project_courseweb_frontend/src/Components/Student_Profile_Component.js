import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import enroll_student from "./Student/Enroll_Student_Component" ;
import enroll_student_for_course from "./Student/Enroll_Student_Course" ;
import my_courses_student from "./Student/My_Courses_Student_Component" ;
import notification_student from "./Student/Notification_Student_Component" ;

export default class Student_Profile extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <Router>
            <div>
                <br/>
                <h3>Student Profile</h3>
                <nav>
                    <Link to={'/enroll_student'}><label>Courses</label></Link> | <label/>
                    <Link to={'/my_courses_student'}><label>My Courses</label></Link> | <label/>
                    <Link to={'/notification_student'}><label>Notification</label></Link>
                </nav>
                <Route exact path={'/enroll_student'} component={enroll_student}/>
                <Route exact path={'/my_courses_student'} component={my_courses_student}/>
                <Route exact path={'/notification_student'} component={notification_student}/>
                <Route exact path={'/student/enroll_course/:courseId'} component={enroll_student_for_course}/>
            </div>
            </Router>
        )
    }
}