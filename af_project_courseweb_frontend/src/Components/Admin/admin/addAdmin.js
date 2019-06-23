import React, {Component} from 'react';
import axios from 'axios';

export default class AddAdmin extends Component{

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
            admin_username_error:'',
            admin_email_error:'',
            admin_password_error:''
        }
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

    validate = () => {
        let admin_username_error= '';
        let admin_email_error= '';
        let admin_password_error= '';

        if(!this.state.admin_username_error){
            admin_username_error = 'Name field cannot be empty'
        }
        if(!this.state.admin_email.includes('@')){
            admin_email_error = 'Invalid email'
        }
        if(!this.state.admin_password_error){
            admin_password_error = 'Password field cannot be empty'
        }
        if(admin_email_error && admin_username_error){
            this.setState({ admin_email_error, admin_username_error});
            return false;
        }
        return true;
    }
    onSubmit(e){
        e.preventDefault();

        const isValid = this.validate();

        if(isValid){

            const newAdmin ={
                admin_username: this.state.admin_username,
                admin_email: this.state.admin_email,
                admin_password: this.state.admin_password
            }

            axios.post('http://localhost:4000/admin/add', newAdmin)
                .then(res => console.log(res.data));

            this.setState({
                admin_username:'',
                admin_email:'',
                admin_password:'',
                admin_username_error:'',
                admin_email_error:'',
                admin_password_error:''
            });

            this.props.history.push('/admin_profile');
        }


    }

    render() {
        return (
            <div style={{marginTop: 20}}>
                <h3>Create New Admin</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.admin_username}
                               onChange={this.onChangeAdminUsername}/>
                        <div style={{color: "red"}}>{this.state.admin_username_error}</div>
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               placeholder="example@gmail.com"
                               className="form-control"
                               value={this.state.admin_email}
                               onChange={this.onChangeAdminEmail}/>
                        <div style={{color: "red"}}>{this.state.admin_email_error}</div>
                    </div>

                    <div className="form-group">
                        <label>Password: </label>
                        <input type="text"
                               className="form-control"
                               value={this.state.admin_password}
                               onChange={this.onChangeAdminPassword}/>
                        <div style={{color: "red"}}>{this.state.admin_password_error}</div>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Admin" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}