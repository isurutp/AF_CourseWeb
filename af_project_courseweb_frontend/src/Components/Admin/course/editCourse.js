import React, {Component} from 'react';
import axios from 'axios';
import Validator from '../Validate';

export default class EditCourse extends Component{

    constructor(props) {
        super(props);

        this.onChangeCourseCode = this.onChangeCourseCode.bind(this);
        this.onChangeCourseName = this.onChangeCourseName.bind(this);
        this.onChangeCourseInstructor = this.onChangeCourseInstructor.bind(this);
        this.onChangeCourseInstructorEmail = this.onChangeCourseInstructorEmail.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            course_code:'',
            course_name:'',
            course_instructor:'',
            course_instructor_email:'',
            validationMessage:['']
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/course/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    course_code: response.data.course_code,
                    course_name: response.data.course_name,
                    course_instructor: response.data.course_instructor,
                    course_instructor_email: response.data.course_instructor_email
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeCourseCode(e){
        this.setState({
            course_code: e.target.value
        });
    }

    onChangeCourseName(e){
        this.setState({
            course_name: e.target.value
        });
    }

    onChangeCourseInstructor(e){
        this.setState({
            course_instructor: e.target.value
        });
    }

    onChangeCourseInstructorEmail(e){
        this.setState({
            course_instructor_email: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const validator = new Validator();
        let vaildated = false;
        if (String(this.state.course_code).trim() === "" ||
          String(this.state.course_name).trim() === "" ||
          String(this.state.course_instructor).trim() === "" ||
          String(this.state.course_instructor_email).trim() === ""){
          this.setState({validationMessage:'cannot have empty fields'})
        }else if(!validator.validateUsername(this.state.course_name)){
          this.setState({validationMessage:'Course name is too long'});
        }else if (!validator.validateEmail(this.state.course_instructor_email)){
          this.setState({validationMessage:'email not valided'});
      //        }else if (!validator.validateName(this.state.course_instructor)){
      //          this.setState({validationMessage:'instructor name not valied'});
        }else if (!validator.validateCourseCode(this.state.course_code)){
           this.setState({validationMessage:'code not valid'});
        }else{
          vaildated = true;
          this.setState({validationMessage:''})
        }

        if (vaildated){
          const courseObj = {
              course_code: this.state.course_code,
              course_name: this.state.course_name,
              course_instructor: this.state.course_instructor,
              course_instructor_email: this.state.course_instructor_email
          };
          axios.post('http://localhost:4000/course/update/' +this.props.match.params.id, courseObj)
              .then(res => console.log(res.data));

          this.setState({
              course_code:'',
              course_name:'',
              course_instructor:'',
              course_instructor_email:''
          })

          this.props.history.push('/admin_profile');
        }
    }

    render() {
        return (
            <div>
                <h3>Update Course</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Course Code: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.course_code}
                               onChange={this.onChangeCourseCode}/>
                    </div>

                    <div className="form-group">
                        <label>Course Name: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.course_name}
                               onChange={this.onChangeCourseName}/>
                    </div>

                    <div className="form-group">
                        <label>Course Instructor: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.course_instructor}
                               onChange={this.onChangeCourseInstructor}/>
                    </div>

                    <div className="form-group">
                        <label>Course Instructor Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.course_instructor_email}
                               onChange={this.onChangeCourseInstructorEmail}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Course" className="btn btn-primary"/>
                    </div>
                    
                    <div className= "alert-danger">
                      {this.state.validationMessage}
                    </div>
                </form>
            </div>
        )
    }
}
