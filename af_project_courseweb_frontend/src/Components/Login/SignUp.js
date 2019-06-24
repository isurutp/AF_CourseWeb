import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./SignUp.css"
import axios from 'axios';
import Validator from './Validate'

class SignUp extends React.Component{

  constructor(){
    super();
    this.state = {
      password:[''],
      confirmation:[''],
      email:[''],
      username:[''],
      validationMessage:[''],
      messageClassName:['alert-danger']
    };

    this.setusernameState = this.setusernameState.bind(this);
    this.setPasswordState = this.setPasswordState.bind(this);
    this.submit = this.submit.bind(this);
    this.setEmailState = this.setEmailState.bind(this);
    this.setConfirmationState = this.setConfirmationState.bind(this);
    this.setvalidationMessage = this.setvalidationMessage.bind(this);
  }

  setusernameState(e){
      this.setState({username:e.target.value});

  }

  setConfirmationState(e){
    this.setState({confirmation:e.target.value});
  }

  setEmailState(e){
    this.setState({email:e.target.value});
  }

  setPasswordState(e){
    this.setState({password:e.target.value});
  }

  setvalidationMessage(value){
    this.setState({validationMessage: value});
  }

  submit(e){
     e.preventDefault();
     const validator = new Validator();
     if(!validator.validateUsername(this.state.username)){
       this.setState({validationMessage:'username not valided'});
     }else if (!validator.validateEmail(this.state.email)){
       this.setState({validationMessage:'email not valided'});
     }else if (!validator.validatePassword(this.state.password)){
       this.setState({validationMessage:'password not valided'});
     }else if (!validator.validatePasswordMatch(this.state.password,this.state.confirmation)){
        this.setState({validationMessage:'password did not macth'});
     }else if (String(this.state.password).trim() === "" ||
        String(this.state.confirmation).trim() === "" || String(this.state.email).trim() === "" ||
        String(this.state.username).trim() === ""){
        this.setState({validationMessage:'cannot have empty fields'})
     }else{
       this.setState({validationMessage:''})
     }


    if (this.state.validationMessage == ''){

      const newStudent = {
        "student_id":this.state.username,
        "student_email":this.state.email,
        "student_password" :this.state.password,

      }
      axios.post('http://localhost:4000/signup',newStudent)
        .then(res => {
              this.setState({messageClassName:'alert-success'});
              this.setState({validationMessage: res.data.validated});
        });



    }
  }





  render(){
    return(
      <div className='centerForm'>
      <form onSubmit={this.submit}>
        <table>
        <tbody>
          <tr className='form-group'>
            <td><label>username :</label></td>
            <td>
              <input type='text' name='username' className='form-control'
                onChange={this.setusernameState} value={this.state.username}/>
            </td>
          </tr>
          <tr className='form-group'>
            <td><label>Email :</label></td>
            <td>
              <input type='text' className='form-control' name='email'
                onChange={this.setEmailState} value={this.state.email}/>
            </td>
          </tr>
          <tr className='form-group extended_column_top'>
            <td><label>Password :</label></td>
            <td>
              <input type='password' className='form-control' name='password'
                onChange={this.setPasswordState} value={this.state.password}/>
            </td>
          </tr>
          <tr className='form-group'>
            <td><label>confirm Password :</label></td>
            <td>
              <input type='password' className='form-control' name='confirmPassword'
                onChange={this.setConfirmationState} value={this.state.confirmation} />
            </td>
          </tr>

          <tr>
            <td colSpan="2" className ='extended_column_top_d'>
              <input type='submit' name='submit' className='form-control btn-primary float_right'
                value='Sign Up' />
            </td>
          </tr>
          <tr className='roundedCorners'>
            <td colSpan="2">
              <p className={this.state.messageClassName + 'roundedCorners float_left full_line'}>
                {this.state.validationMessage}
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </form>
      </div>
    );
  }



}


export default SignUp;
