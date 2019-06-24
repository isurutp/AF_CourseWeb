import React, {Component} from "react";
import axios from 'axios' ;
import SignUp from './Login/SignUp'

export default class Register_Component extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        return(
            <div>
                <SignUp/>
            </div>
        )
    }
}
