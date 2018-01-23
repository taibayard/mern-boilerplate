import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import axios from 'axios';

//Components
import Home from './Home.js';
import Nav from './layout/Nav.js';
import Profile from './Profile.js';
import Login from './auth/Login.js';
import Logout from './auth/Logout.js';
import Signup from './auth/Signup.js';
import Footer from './layout/Footer.js';
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user:{},
      token:''
    }
  }
  componentDidMount = () => {
    this.loadUser();
  }
  loadUser = () => {
    console.log("loading user...");
    const token = localStorage.getItem('mernToken');
    if(token){
      console.log("valid token", token);
      //Use axios to get user from the token
      axios.post("/auth/me/from/token",{
        token:token
      }).then((result)=>{
        console.log("Success", result);
        if(result){
          //there is data in result
          localStorage.setItem("mernToken",result.data.token);
          this.setState({
            token:result.data.token,
            user: result.data.user
          });
        }else{
          //nothing returned ?
          localStorage.removeItem("mernToken");
          this.setState({
            token: '',
            user:null
          });
        }
      }).catch((err)=>{
        console.log("Error",err);
      });
    }else{
      this.setState({
        token:"",
        user: null
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <div className="content">
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={
                () => (<Signup user={this.state.user} updateUser={this.loadUser} />)
              } />
              <Route exact path="/profile" component={Profile} />
              <Logout />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
