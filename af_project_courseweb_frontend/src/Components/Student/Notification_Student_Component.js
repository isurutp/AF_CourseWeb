import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

const ReadLis = props => (
    <tr>
        <td>{props.list[0].assignment_name}</td>
        <td>{props.list[0].assignment_due}</td>
        <td>
            <Link to={"/student/add_submission/"+ props.list[0]._id}>Add Submission</Link>
        </td>
    </tr>
);

export default class Notification_Student_Component extends Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/courseweb/student/assignments/5d0fd17d7885722f646b8b35')
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
                <h3>Notification</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                    <tr>
                        <th>Assignment</th>
                        <th>Deadline</th>
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