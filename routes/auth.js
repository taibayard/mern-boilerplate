require('dotenv').config();
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user');
var bcrypt = require('bcrypt');
// Used for creating and sending tokens and protecting backend routes
// var expressJWT = require('express-jwt'); //<- for protecting routes on the backend
var jwt = require('jsonwebtoken');

// POST /auth/login route - returns a JWT
router.post('/login', function(req, res, next) {
  console.log('/auth/login post route', req.body);
  //First, try and find the user 
  User.findOne({email:req.body.email},function(err,user){
    if(!user || !user.password){
      return res.status(450).send({error: true, message: "User Not Found!"});
    }
    if(bcrypt.compareSync(req.body.password, user.password)){
      //Good to go 
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
        expiresIn: 60*60*24 //expire in 24 hours
        });
        res.send({user:user,token:token});
    }else{
      //Bad password
      res.status(450).send({error:true,message: "Bad Password"});
    }
  });
});


// POST /auth/signup route - create a user in the DB and then log them in
router.post('/signup', function(req, res, next) {
  //check if the user exists
  console.log('/auth/signup post route', req.body);
  User.findOne({
    email: req.body.email
  }, function(err, user){
    if(user){
      //No bueno! user should be logging into existing account not creating an account
      return res.status(400).send({error:true, message: ' U don goofed. Login bud '});
    }else{
      //Bueno! create and save the user
      User.create(req.body,function(err, user){//req.body already contains all the data for creating a user +  it is already structured as an object
        if(err){
          //server error
          return res.status(500).send({
            error:true,
            message:"Database error" + err.message
          })
        }else{
          //Make a token and send it to the caller
          var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
          expiresIn: 60*60*24 //expire in 24 hours
          });
        }
         res.send({user:user,token:token});
      });
    }
  });
});

// This is checked on a browser refresh
router.post('/me/from/token', function(req, res, next) {
  // check header or url parameters or post parameters for token
  console.log('find user from token', req.body);
  var token = req.body.token || req.query.token;
  if(!token){
    return res.status(418).send({error:true, message:"You must be a teapot! Send a token next time, Mr. Teapot."});
  }

  //Get the user rom the token 
  jwt.verify(token, process.env.JWT_SECRET,function(err,user){
    if(err){
      return res.status(500).send({error: true, message: 'JWT Verification Error - ' + err.message});
    }
    
    //Find the user by using the ID from JWT
    User.findById({
      '_id':user._id
    },function(err,user){
      if(err){
        return res.status(500).send({error:true,message:'Database error -' + err.message});
      }else if(!user){
        //if there was no user found in database
        return res.status(500).send({error:true, message: 'Unable to find user from provided token'});
      }

      //Renew token
      var token = jwt.sign(user.toObject(), process.env.JWT_SECRET,{
        expiresIn:60 * 60 * 24 //Expires in 24 hours
      });
      res.send({user:user, token: token});
    });
  });
});

module.exports = router;
