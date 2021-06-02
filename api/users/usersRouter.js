const express = require('express');
const Users = require('./usersModel');

const restricted = require('../auth/restricted');

//new router
const router = express.Router();



// //---------
// //TESTING: GET ALL USERS
// //---------

// //GET /api/users
//---------------------------------
router.get('/', restricted, (req, res, next)=>{
  Users.getUsers()
    .then(users => {
      res.status(200).json(users);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving userlist',
        errorName:err.name,
        errorMessage:err.message,
      });
    })
});


// //GET /api/users/:id
//---------------------------------
router.get('/:id', restricted, (req, res, next)=>{
  const id = req.params.id;

  Users.getUserById(id)
    .then(user => {
      res.status(200).json(user);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving user',
        errorName:err.name,
        errorMessage:err.message,
      });
    })

})


// //GET /api/users/trucks/:id
//---------------------------------
router.get('/trucks/:id', restricted, (req, res, next)=>{
  const id = req.params.id;

  Users.ownedTrucks(id)
    .then(trucks => {
      res.status(200).json(trucks);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving trucks list',
        errorName:err.name,
        errorMessage:err.message,
      });
    })

})

//export
module.exports = router;
