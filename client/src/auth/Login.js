import React, {Component} from 'react';
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    handleEmailChange = (e) => {
        this.setState({email: e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({password: e.target.value});
    }
    handleFormSubmit = (e) =>{
        e.preventDefault();
        console.log("form was submitted");

        axios.post("/auth/login",{
            email:this.state.email,
            password:this.state.password
        }).then((result)=>{
            console.log("Success", result);
        }).catch((err)=>{
            console.log("Error", err);  
        });
    }
    render(){
        return(
          <form onSubmit={this.handleFormSubmit}>
            <div>
                <label> Email: </label>
                <input type="text" name="Email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange}/>
            </div>
            <div>
                <label> Password: </label>
                <input type="password" name="Password" placeholder="Enter your password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <input type="submit" value="Login"/>
          </form>
        );
    }
}

export default Login;