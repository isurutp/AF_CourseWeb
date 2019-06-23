import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

export default class Enroll_Student_Course extends Component {
    constructor(props){
        super(props);

        this.onChangeEnrollmentKey = this.onChangeEnrollmentKey.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            enrollmentKey: ''
        };
    }

    onChangeEnrollmentKey(e){
        this.setState({
            enrollmentKey: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const bodyData = {
            courseId: this.props.match.params.courseId
        };

        if (!this.state.enrollmentKey == ''){
            axios.post('http://localhost:4000/courseweb/student/enroll/5d0dd44f17a08e5750a67939', bodyData)
                .then(res => {
                    console.log(res.data);
                });

            console.log(this.props.match.params.courseId)

            this.setState({
                enrollmentKey: ''
            });
            console.log(this.state.enrollmentKey)
            this.props.history.push("/my_courses_student");
        }else{
            console.log("Enter enrollment key")
        }
    }

    render() {
        return(
            <div>
                <br/>
                <h3>Enroll</h3>
                <form onSubmit={this.onSubmit}>
                    <label>Enrollment key</label><br/>
                    <input type={"text"} onChange={this.onChangeEnrollmentKey}/><br/><br/>
                    <input type={"submit"} value={"Submit"} className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}
