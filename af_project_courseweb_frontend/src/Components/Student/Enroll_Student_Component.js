import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

const ReadLis = props => (
    <tr>
        <td>{props.list.course_name}</td>
        <td>{props.list.course_code}</td>
        <td>
            <Link to={"/student/enroll_course/"+ props.list._id}>Enroll</Link>
        </td>
    </tr>
);


export default class Enroll_Student_Component extends Component {

    constructor(props){
        super(props);

        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/courseweb/course/all')
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
                <h3>Course List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Code</th>
                        <th>Action</th>
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