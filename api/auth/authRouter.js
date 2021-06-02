const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/usersModel');
const {jwtSecret} = require('./secrets.js');
require('dotenv').config();

const {uniqueName, uniqueEmail, validRegister} = require('../users/usersValidate');

const router = express.Router();

// ENDPOINTS
//-------------------------------------------

/*  
user
{
  "username":"", string, unique, required
  "password":"", string, required
  "email":"", string, unique, required
  "location":1 integer, optional
}
*/


// //GET /api/auth/diners
//---------------------------------
router.get('/diners', (req, res, next)=>{

  // *** COPY OPERATORS HERE WHEN DONE ****

  next();
});



//---------
//REGISTER
//---------

//POST /api/auth/register/operators
//---------------------------------
router.post('/register/operators', validRegister, uniqueName, uniqueEmail, (req, res, next)=>{
  const newUser = req.body;
  newUser.isOperator = 1;

  //theoretical env
  const rounds = process.env.BCRYPT_ROUNDS || 8;
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNewUser(newUser)
    .then(user => {
      res.status(201).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving creating new user',
        errorName:err.name, 
        errorMessage:err.message,
      });
    });
});


//POST /api/auth/register/diners
//---------------------------------
router.post('/register/diners', validRegister, uniqueName, uniqueEmail, (req, res, next)=>{
  const newUser = req.body;
  newUser.isOperator = 0;

  //theoretical env
  //removed env toggle due to bcrypt "invalid salt version" error
  const rounds = 12;
  // console.log(rounds,' bcrypt rounds =============');
  const hash = bcrypt.hashSync(newUser.password, rounds);
  newUser.password = hash;

  Users.addNewUser(newUser)
    .then(user => {
      res.status(201).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving creating new user',
        errorName:err.name, 
        errorMessage:err.message,
      });
    });
});




//---------
//LOGIN
//---------

//POST /api/auth/login/
//---------------------------------
router.post('/login/', (req, res, next)=>{
  const pendingUser = req.body;

  Users.getUserByName(pendingUser.username)
    .then(dbUser=>{
      if(dbUser && bcrypt.compareSync(pendingUser.password, dbUser.password)){
        const token = makeJwt(dbUser);
        res.status(200).json({message:'Login successful!', token});
        next();
      }else {
        res.status(401).json({message:'Invalid credentials'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message:'Server error logging in',
        errorName:err.name, 
        errorMessage:err.message
      });
    });
});


function makeJwt(user){

  const payload = {
    subject:user.id,
    username:user.username,
    role:user.role
  };

  const options = {
    expiresIn: '1h'
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;