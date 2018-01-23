import React, {Component} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            email:'',
            password:'',
            name:''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("form was submitted ");
        
        axios.post("/auth/signup",{
            name: this.state.name,
            email:this.state.email,
            password: this.state.password
        }).then((result)=>{
            console.log("Response from server " , result);
            localStorage.setItem('mernToken', result.data.token);
            //Update the parent object
            this.props.updateUser();
        }).catch((err)=>{
            console.log("server had an error", err);

        });
    }
    render(){
        if(this.props.user){
            return(<Redirect to="/profile" />)
        }else{
            return(
                <form onSubmit={this.handleFormSubmit}>
                <div>
                    <label> Email: </label>
                    <input type="text" name="email" placeholder="Your Email" value={this.state.email} onChange={this.handleChange}/>
                </div>
                <div>
                    <label> Name: </label>
                    <input type="text" name="name" placeholder="Your name" value={this.state.name} onChange={this.handleChange} />
                </div>
                <div>
                    <label> Password: </label>
                    <input type="password" name="password" placeholder="Enter your password" value={this.state.password} onChange={this.handleChange}/>
                </div>
                <input type="submit" value="Login"/>
            </form>
            );
        }
    }
}

export default Signup;