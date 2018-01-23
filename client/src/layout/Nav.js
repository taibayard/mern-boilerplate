import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout.js'
class Nav extends Component{
    render(){
        return(
            <div>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                    <Link to="/profile">Profile</Link>
                </nav>
                <h1>Tai's MERN Stack Boilerplate</h1>
            </div>
        );
    }
}

export default Nav;