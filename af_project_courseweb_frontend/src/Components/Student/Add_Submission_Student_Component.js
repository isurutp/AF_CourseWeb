import React, {Component} from "react";
import {Link} from 'react-router-dom';
import axios from 'axios' ;

export default class Add_Submission_Student_Component extends Component {
    constructor(props){
        super(props);

        this.onChangeFile = this.onChangeFile.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            fileDetails: [],
            fileName: ''
        };
    }

    onChangeFile(e){
        this.setState({
            fileDetails: e.target.files[0],
            fileName: e.target.files[0].name
        });
        var details = e.target.files[0] ;
        console.log(details)
    }

    onSubmit(e){
        e.preventDefault()

        console.log("File details : " + this.state.fileDetails)
        console.log("Last modified :" + this.state.fileDetails.lastModifiedDate)
        console.log("File name : " + this.state.fileName)

        const sendData = {
            filename : this.state.fileDetails.name
        } ;
        axios.post('http://localhost:4000/courseweb/student/assignment_submission' , sendData)
            .then(res => {
                console.log(res.data);
            }).catch(err => {
                console.log(err)
        })
        //this.props.history.push('/courseweb/student_profile');
    }

    //action={"http://localhost:4000/assignment_upload/" + this.props.match.params.courseId}

    render() {
        return(
            <div>
                <h3>Upload Assignment</h3><br/>
                <form method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
                    <input type="file" name="filename" onChange={this.onChangeFile}/> <br/><br/>
                        <input type="submit" value="upload" className="btn btn-primary"/>
                </form>
            </div>
        )
    }
}