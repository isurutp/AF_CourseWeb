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
            admin_password:''
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
    onSubmit(e){
        e.preventDefault();

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
                    </div>

                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text"
                               placeholder="example@gmail.com"
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
                        <input type="submit" value="Create Admin" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}