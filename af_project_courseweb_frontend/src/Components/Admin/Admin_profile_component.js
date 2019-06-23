import React, {Component} from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import viewList from './view/viewDetails';
import AddAdmin from './admin/addAdmin';
import AddCourse from './course/addCourse';
import AddInstructor from './Instructor/addInstructor';
import EditAdmin from './admin/editAdmin';
import EditInstructor from './Instructor/editInstructor';
import EditCourse from './course/editCourse';
import sendEmail from './email/sendEmail';

export default class Admin_Profile extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <Router>
                <div>
                    <br/>
                    <h3>Admin Profile</h3>
                    <nav>
                        <Link to={'/admin_profile'}><label>Admin Details</label></Link> | <label/>
                        <Link to={'/admin'}><label>Add Admin</label></Link> | <label/>
                        <Link to={'/instructor'}><label>Add instructor</label></Link>
                    </nav>
                    <Route path="/admin_profile" exact component={viewList}/>
                    <Route path="/admin" component={AddAdmin}/>
                    <Route path="/course/:id" component={AddCourse}/>
                    <Route path="/instructor" component={AddInstructor}/>
                    <Route path="/editAdmin/:id" component={EditAdmin}/>
                    <Route path="/editInstructor/:id" component={EditInstructor}/>
                    <Route path="/editCourse/:id" component={EditCourse}/>
                    <Route path="/sendEmail/:id" component={sendEmail}/>
                </div>
            </Router>
        )
    }
}