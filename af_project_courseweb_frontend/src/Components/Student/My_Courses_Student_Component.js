import React, {Component} from "react";
import axios from 'axios' ;

const ReadLis = props => (
    <tr>
        <td>{props.list.course_name}</td>
        <td>{props.list.course_code}</td>
        <td>{props.list.course_instructor}</td>
        <td>{props.list.course_instructor_email}</td>
    </tr>
);

export default class My_Courses_Student_Component extends Component {

    constructor(props){
        super(props);
        this.state = {
            list : []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/courseweb/student/my_courses/5d0dd44f17a08e5750a67939')
            .then(res => {
                this.setState({list: res.data});
            }).catch(function (err) {
            console.log(err);
        });
    }

    readList() {
        return this.state.list.map(function (currentList, i) {
            return <ReadLis list={currentList} key={i} /> ;
        });
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
                        <th>Lecture</th>
                        <th>Lecture Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.readList()}
                    {this.read}
                    </tbody>
                </table>
            </div>
        )
    }
}