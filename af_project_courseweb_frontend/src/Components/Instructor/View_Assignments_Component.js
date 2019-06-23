import React, { Component } from "react";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import axios from 'axios';

const ReadLis = props => (
    <tr>
        <td>{props.list.assignment_name}</td>
        <td>{props.list.assignment_due}</td>
        <td>{props.list.assignment_marks}</td>
        <td>Edit Assignment</td>
    </tr>
);

export default class View_Assignment_Components extends Component{
    constructor(props){
        super(props);
        this.state = {
            list :[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:4000/courseweb/assignments/'+ this.props.match.params.id)
        .then(res => {
            this.setState({list : res.data});
        }).catch(function (err){
            console.log(err);
        })
    }

    readList() {
        return this.state.list.map(function (currentList, i){
            return <ReadLis list = {currentList} key = {i} />
        });
    }

    render(){
        return (
            <div>
                <br/>
                <h3>Assignments</h3>
                <table className = "table table-striped" style = {{marginTop : 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Due</th>
                            <th>Marks</th>
                            <th>Actions</th>
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