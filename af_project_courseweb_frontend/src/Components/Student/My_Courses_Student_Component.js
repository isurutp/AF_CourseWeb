import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

export default class My_Courses_Student_Component extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <br/>
                <h3>My Courses</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    </tbody>
                </table>
            </div>
        )
    }
}