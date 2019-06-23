import React, {Component} from 'react';
import axios from 'axios';

export default class sendEmail extends Component{

    constructor(props) {
        super(props);

        this.onChangeEmailFrom = this.onChangeEmailFrom.bind(this);
        this.onChangeEmailTo = this.onChangeEmailTo.bind(this);
        this.onChangeEmailSubject = this.onChangeEmailSubject.bind(this);
        this.onChangeEmailText = this.onChangeEmailText.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email_from:'navod80@gmail.com',
            email_to:'',
            email_subject:'',
            email_text:'Dear instructor, You have been assigned for the above course'
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/course/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    email_to: response.data.course_instructor_email,
                    email_subject: response.data.course_name
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeEmailFrom(e){
        this.setState({
            email_from: e.target.value
        });
    }

    onChangeEmailTo(e){
        this.setState({
            email_to: e.target.value
        });
    }

    onChangeEmailSubject(e){
        this.setState({
            email_subject: e.target.value
        });
    }

    onChangeEmailText(e){
        this.setState({
            email_text: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const emailObj = {
            email_to: this.state.email_to,
            email_subject: this.state.email_subject,
            email_text: this.state.email_text
        };

        axios.post('http://localhost:4000/email', emailObj)
            .then(response => {
                if(!response){
                    console.log('error');
                }
                else {
                    console.log('successful');
                }
            })

        this.setState({
            email_from:'navod80@gmail.com',
            email_to:'',
            email_subject:'',
            email_text:'Dear instructor, You have been assigned for the above course'
        })

        this.props.history.push('/admin_profile');
    }

    render() {
        return (
            <div>
                <h3>Send Email</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>To: </label>
                        <input type="text"
                               id="email_to"
                               className="form-control"
                               value={this.state.email_to}
                               onChange={this.onChangeEmailTo}/>
                    </div>

                    <div className="form-group">
                        <label>Subject: </label>
                        <input type="text"
                               id="email_subject"
                               className="form-control"
                               value={this.state.email_subject}
                               onChange={this.onChangeEmailSubject}/>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <textarea className="form-control"
                                  id="email_description"
                                  value={this.state.email_text}
                                  onChange={this.onChangeEmailText}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Send Email" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}