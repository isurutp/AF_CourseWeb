import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';
import Validator from './Validate';

import view_assignment from './View_Assignments_Component';

export default class Edit_Assignment_Component extends Component {
    constructor(props) {
        super(props);

        this.onChangeAssignmentName = this.onChangeAssignmentName.bind(this);
        this.onChangeAssignmentDue = this.onChangeAssignmentDue.bind(this);
        this.onChangeAssignmentMarks = this.onChangeAssignmentMarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            assignment_name: '',
            assignment_due: '',
            assignment_marks: 0,
            assignment_course: this.props.match.params.id
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/courseweb/assignments/get/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    assignment_name: response.data.assignment_name,
                    assignment_due: response.data.assignment_due,
                    assignment_marks: response.data.assignment_marks,
                    assignment_course: response.data.assignment_course,
                    validationMessage:['']
                })
            })
            .catch(function(error){
                console.log(error)
            });
    }

    onChangeAssignmentName(e) {
        this.setState({
            assignment_name: e.target.value
        });
    }

    onChangeAssignmentMarks(e) {
        this.setState({
            assignment_marks: e.target.value
        });
    }

    onChangeAssignmentDue(e) {
        this.setState({
            assignment_due: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const validator = new Validator();
        let vaildated = false;
        if (String(this.state.assignment_name).trim() === "" ||
          String(this.state.assignment_due).trim() === "" || String(this.state.email).trim() === "" ||
          String(this.state.assignment_marks).trim() === ""){
          this.setState({validationMessage:'cannot have empty fields'})
        // }else if (!(this.state.assignment_marks <= 0
        //   && this.state.assignment_marks >= 100)){
        //   this.setState({validationMessage:
        //     'Marks must be an number between 0 and 100'});
        }else{
          vaildated = true;
          this.setState({validationMessage:''})
        }

        if (vaildated){
          const newAssignment = {
              assignment_name: this.state.assignment_name,
              assignment_due: this.state.assignment_due,
              assignment_marks: this.state.assignment_marks,
              assignment_course: this.state.assignment_course
          }

          console.log(newAssignment);

          axios.post('http://localhost:4000/courseweb/assignments/update/' + this.props.match.params.id, newAssignment)
              .then(res => console.log(res.data));

          this.props.history.push('/view_assignment/' + this.state.assignment_course);
        }
    }

    render() {
        return (
            <div style={{ marginTop: 20 }}>
                <h3>Add Assignment</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Assignment Name</label>
                        <input type="text"
                            className="form-control"
                            value={this.state.assignment_name}
                            onChange={this.onChangeAssignmentName} />
                    </div>
                    <div className="form-group">
                        <label>Due Date</label>
                        <input type="text"
                            className="form-control"
                            placeholder="MM-DD-YYYY"
                            value={this.state.assignment_due}
                            onChange={this.onChangeAssignmentDue} />
                    </div>

                    <div className="form-group">
                        <label>Maximum Marks</label>
                        <input type="number"
                            className="form-control"
                            value={this.state.assignment_marks}
                            onChange={this.onChangeAssignmentMarks} />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Assignment" className="btn btn-primary" />
                    </div>
                    <div className= "alert-danger">
                      {this.state.validationMessage}
                    </div>

                    <Route exact path={'/view_assignment/:id'} component = {view_assignment}/>
                </form>
            </div>
        )
    }
}
