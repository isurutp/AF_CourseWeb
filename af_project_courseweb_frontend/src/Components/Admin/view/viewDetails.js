import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Admin = props => (
    <tr>
        <td>{props.admin.admin_username}</td>
        <td>{props.admin.admin_email}</td>
        <td>{props.admin.admin_password}</td>
        <td>
            <Link to={"/editAdmin/" +props.admin._id}>Edit</Link>
        </td>
        <td>
            <button onClick={() => onDelete(props.admin._id)}>Delete</button>
        </td>
    </tr>
);

function onDelete(adminId){
    axios.delete('http://localhost:4000/admin/delete/' + {id: adminId   })
        .then(res => {
            console.log(res);
            console.log('it works');
        })
        .catch((err) => {
            console.log(err);
        });
    console.log('inside');
}

const Instructor = props => (
    <tr>
        <td>{props.instructor.instructor_username}</td>
        <td>{props.instructor.instructor_email}</td>
        <td>{props.instructor.instructor_password}</td>
        <td>
            <Link to={"/editInstructor/" +props.instructor._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/course/" +props.instructor._id}>Add Course</Link>
        </td>
    </tr>
);

const Course = props => (
    <tr>
        <td>{props.course.course_code}</td>
        <td>{props.course.course_name}</td>
        <td>{props.course.course_instructor}</td>
        <td>{props.course.course_instructor_email}</td>
        <td>
            <Link to={"/editCourse/" +props.course._id}>Edit</Link>
        </td>
        <td>
            <Link to={"/sendEmail/" +props.course._id}>Send Email</Link>
        </td>
    </tr>
);

export default class viewList extends Component{

    constructor(props) {
        super(props);

        this.state = {admins: [],
            instructors: [],
            courses: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admin/')
            .then(response => {
                this.setState({admins: response.data});
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:4000/instructor/')
            .then(response => {
                this.setState({instructors: response.data});
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:4000/course/')
            .then(response => {
                this.setState({courses: response.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    componentDidUpdate() {
        axios.get('http://localhost:4000/admin/')
            .then(response => {
                this.setState({admins: response.data});
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:4000/instructor/')
            .then(response => {
                this.setState({instructors: response.data});
            })
            .catch((err) => {
                console.log(err);
            })

        axios.get('http://localhost:4000/course/')
            .then(response => {
                this.setState({courses: response.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }

    adminList(){
        return this.state.admins.map((currentAdmin, i) => {
            return <Admin admin = {currentAdmin} key = {i} />;
        });
    }

    instructorList(){
        return this.state.instructors.map((currentInstrutor, i) => {
            return <Instructor instructor  = {currentInstrutor} key = {i} />;
        });
    }

    courseList(){
        return this.state.courses.map((currentCourse, i) => {
            return <Course course  = {currentCourse} key = {i} />;
        });
    }


    render() {
        return (
            <div>
                <h3>Admin details</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.adminList() }
                    </tbody>
                </table>
                <br/><br/>

                <h3>Instructor details</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Edit</th>
                        <th>Add Course</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.instructorList() }
                    </tbody>
                </table>
                <br/><br/>

                <h3>Course details</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Course Code</th>
                        <th>Course Name</th>
                        <th>Course Instructor</th>
                        <th>Course Instructor Email</th>
                        <th>Edit</th>
                        <th>Send Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.courseList() }
                    </tbody>
                </table>
            </div>
        )
    }
}