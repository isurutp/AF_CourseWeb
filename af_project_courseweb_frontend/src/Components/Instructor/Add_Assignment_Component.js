import React, { Component } from 'react';
import axios from 'axios';

export default class Add_Assignment_Component extends Component {
    constructor(props) {
        super(props);

        this.onChangeAssignmentName = this.onChangeAssignmentName.bind(this);
        this.onChangeAssignmentDue = this.onChangeAssignmentDue.bind(this);
        this.onChangeAssignmentMarks = this.onChangeAssignmentMarks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            assignment_name :'',
            assignment_due :'',
            assignment_marks : 0,
            assignment_course : this.props.match.id
        }
    }

    onChangeAssignmentName(e){
        this.setState({
            assignment_name: e.target.value
        });
    }

    onChangeAssignmentMarks(e){
        this.setState({
            assignment_marks: e.target.value
        });
    }

    onChangeAssignmentDue(e){
        this.setState({
            assignment_due: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        console.log(`Todo Completed: ${this.props.match.params.id}`);


        const newAssignment = {
            assignment_name : this.state.assignment_name,
            assignment_due : this.state.assignment_due,
            assignment_marks : this.state.assignment_marks,
            assignment_course : this.props.match.params.id
        }

        console.log(newAssignment);

        axios.post('http://localhost:4000/courseweb/assignments/add', newAssignment)
        .then(res => console.log(res.data));

        this.setState({
            assignment_name :'',
            assignment_due :'',
            assignment_marks : 0,
            assignment_course : this.props.match.params.id
        })
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

                    <div className = "form-group">
                        <label>Maximum Marks</label>
                        <input type = "number"
                        className = "form-control"
                        value = {this.state.assignment_marks}
                        onChange = {this.onChangeAssignmentMarks} />
                    </div>
                    <div className = "form-group">
                        <input type = "submit" value = "Add Assignment" className = "btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}