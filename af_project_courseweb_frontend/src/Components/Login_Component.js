import React, {Component} from "react";
import axios from 'axios' ;
import Login from './Login/Login'

export default class LoginComponent extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <Login/>
            </div>
        )
    }
}
