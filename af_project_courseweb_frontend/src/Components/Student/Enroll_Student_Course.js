import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

export default class Enroll_Student_Course extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <br/>
                <h3>Enroll for</h3>
                <form>
                    <label>Enrollment key</label><br/>
                    <input type={"text"}/><br/><br/>
                    <input type={"submit"} value={"Submit"} className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}