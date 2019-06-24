import React, {Component} from 'react';
import axios from 'axios';
import Validator from '../Validate';

export default class EditAdmin extends Component{

    constructor(props) {
        super(props);

        this.onChangeAdminUsername = this.onChangeAdminUsername.bind(this);
        this.onChangeAdminEmail = this.onChangeAdminEmail.bind(this);
        this.onChangeAdminPassword = this.onChangeAdminPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            admin_username:'',
            admin_email:'',
            admin_password:'',
            validationMessage:['']
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/admin/' +this.props.match.params.id)
            .then(response => {
                this.setState({
                    admin_username: response.data.admin_username,
                    admin_email: response.data.admin_email,
                    admin_password: response.data.admin_password
                })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    onChangeAdminUsername(e){
        this.setState({
            admin_username: e.target.value
        });
    }

    onChangeAdminEmail(e){
        this.setState({
            admin_email: e.target.value
        });
    }

    onChangeAdminPassword(e){
        this.setState({
            admin_password: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const validator = new Validator();
        let vaildated = false;
        if (String(this.state.admin_username).trim() === "" ||
          String(this.state.admin_email).trim() === "" ||
          String(this.state.admin_password).trim() === "" ) {
        this.setState({validationMessage:'cannot have empty fields'})
        }else if(!validator.validateUsername(this.state.admin_username)){
          this.setState({validationMessage:'username too long'});
        }else if (!validator.validateEmail(this.state.admin_email)){
          this.setState({validationMessage:'email not valided'});
        }else if (!validator.validatePassword(this.admin_password)){
          this.setState({validationMessage:
            'password not valided only use (\"! # $ % & _ ?\") Symbols'});
        }else{
          vaildated = true;
          this.setState({validationMessage:''})
        }




        if (vaildated){
          const adminObj = {
              admin_username: this.state.admin_username,
              admin_email: this.state.admin_email,
              admin_password: this.state.admin_password
          };
          axios.post('http://localhost:4000/admin/update/' +this.props.match.params.id, adminObj)
              .then(res => console.log(res.data));

          this.setState ({
              admin_username: '',
              admin_email: '',
              admin_password: ''
          });

        //this.props.history.push('/admin_profile');
      }
    }

    render() {
        return (
            <div>
                <h3>Update Admin</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.admin_username}
                               onChange={this.onChangeAdminUsername}/>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.admin_email}
                               onChange={this.onChangeAdminEmail}/>
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.admin_password}
                               onChange={this.onChangeAdminPassword}/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Update Admin" className="btn btn-primary"/>
                    </div>
                    <div className= "alert-danger">
                      {this.state.validationMessage}
                    </div>
                </form>
            </div>
        )
    }
}
