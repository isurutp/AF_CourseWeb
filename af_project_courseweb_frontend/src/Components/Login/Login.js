import React from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import Axios from 'axios';
import student_profile from "../Student_Profile_Component";

class Login extends React.Component {

  constructor() {
    super();
    this.state = {
      password: [''],
      username: [''],
      vaildationMessage: ['']
    };

    this.setusernameState = this.setusernameState.bind(this);
    this.setPasswordState = this.setPasswordState.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    this.setVaildationMessage = this.setVaildationMessage.bind(this);
  }

  setusernameState(e) {
    this.setState({ username: e.target.value });
  }

  setPasswordState(e) {
    this.setState({ password: e.target.value });
  }

  setVaildationMessage(value) {
    this.setState({ vaildationMessage: value.target.value });
  }

  submitLogin(e) {
    e.preventDefault();
    const login = {
      "password": this.state.password,
      "username": this.state.username,
    }
    Axios.post('http://localhost:4000/courseweb/login', login)
      .then(res => {
        if (res.data.validated) {
          if (res.data.type.trim() === "instuctor" ||
            res.data.type.trim() === "admin") {
            this.props.history.push('/admin_profile');
          }
          else if (res.data.type.trim() === "student") {
            this.props.history.push('/student_profile');
          } else {
            this.setState({ vaildationMessage: "login unsuccessful" });
          }
        }
      });
  }



  render() {
    return (
      <div className='centerForm'>
        <form onSubmit={this.submitLogin}>
          <table>
            <tbody>
              <tr className='form-group'>
                <td><label>username :</label></td>
                <td>
                  <input type='text' name='username' className='form-control'
                    onChange={this.setusernameState} value={this.state.username} />
                </td>
              </tr>
              <tr className='form-group extended_column_bottom'>
                <td><label>Password :</label></td>
                <td>
                  <input type='password' className='form-control' name='password'
                    onChange={this.setPasswordState} value={this.state.password} />
                </td>
              </tr>
              <tr>
                <td colSpan="2" className='extended_column_top'>
                  <input type='submit' name='submit' className='form-control btn-primary float_right'
                    value='Login' />
                </td>
              </tr>
              <tr className='extended_column_bottom roundedCorners extended_column_bottom'>
                <td colSpan="2">
                  <p className='alert-danger roundedCorners float_left full_line'>
                    {this.state.vaildationMessage}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <Route exact path = {"/student_profile"} component = {"student_profile"}/>
      </div>
      
    );
  }



}


export default Login;
