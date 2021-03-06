import React, {Component} from 'react';
import axios from 'axios';
import Validator from '../Validate';

export default class EditInstructor extends Component{

    constructor(props) {
        super(props);

        this.onChangeInstructorUsername = this.onChangeInstructorUsername.bind(this);
        this.onChangeInstructorEmail = this.onChangeInstructorEmail.bind(this);
        this.onChangeInstructorPassword = this.onChangeInstructorPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            instructor_username:'',
            instructor_email:'',
            instructor_password:''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/instructor/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    instructor_username: response.data.instructor_username,
                    instructor_email: response.data.instructor_email,
                    instructor_password: response.data.instructor_password
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeInstructorUsername(e){
        this.setState({
            instructor_username: e.target.value
        });
    }

    onChangeInstructorEmail(e){
        this.setState({
            instructor_email: e.target.value
        });
    }

    onChangeInstructorPassword(e){
        this.setState({
            instructor_password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const validator = new Validator();
        let vaildated = false;
        if (String(this.state.instructor_username).trim() === "" ||
          String(this.state.instructor_email).trim() === "" ||
          String(this.state.instructor_password).trim() === ""){
          this.setState({validationMessage:'cannot have empty fields'})
        }else if(!validator.validateUsername(this.state.instructor_username)){
          this.setState({validationMessage:'username is too long'});
        }else if (!validator.validateEmail(this.state.instructor_email)){
          this.setState({validationMessage:'email not valided'});
        }else if (!validator.validatePassword(this.state.instructor_password)){
          this.setState({validationMessage
            :'password not valided only use (\"! # $ % & _ ?\") Symbols'});
        }else{
          vaildated = true;
          this.setState({validationMessage:''})
        }

        if (vaildated){
          const instructorObj = {
              instructor_username: this.state.instructor_username,
              instructor_email: this.state.instructor_email,
              instructor_password: this.state.instructor_password
          };
          axios.post('http://localhost:4000/instructor/update/' +this.props.match.params.id, instructorObj)
              .then(res => console.log(res.data));

            this.setState({
                instructor_username:'',
                instructor_email:'',
                instructor_password:''
            })
          //this.props.history.push('/admin_profile');
        }
    }

    render() {
        return (
            <div>
                <h3>Update Instructor</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.instructor_username}
                               onChange={this.onChangeInstructorUsername}/>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.instructor_email}
                               onChange={this.onChangeInstructorEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.instructor_password}
                               onChange={this.onChangeInstructorPassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Instructor" className="btn btn-primary"/>
                    </div>
                    <div className= "alert-danger">
                      {this.state.validationMessage}
                    </div>
                </form>
            </div>
        )
    }
}
