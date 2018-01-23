import React, {Component} from 'react';
import {Link} from 'react-router-dom';
class Logout extends Component{
    handleLogout = (e) =>{
        e.preventDefault();
        //To Do : Ddelete token from local storage
        //go back t ohome page
        console.log("logout function was called");
    }
    render(){
        return(
          <Link to="/" onClick={this.handleLogout}> Logout </Link>
        );
    }
}

export default Logout;