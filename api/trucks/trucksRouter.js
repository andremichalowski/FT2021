const express = require('express');
const Trucks = require('./trucksModel');

const restricted = require('../auth/restricted');



//new router
const router = express.Router();

//------------------------------


//need role checker here
//check if user is operator for edit methods


//-------------------------------





// GET /api/trucks
//---------------------------------
router.get('/', restricted, (req,res)=>{

  Trucks.getTrucks()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving trucks list',
        errorName:err.name,
        errorMessage:err.message
      });
    })
});


// GET /api/trucks/:id
//---------------------------------

router.get('/:id', restricted, (req,res)=>{
  const id = req.params.id;

  Trucks.getTruckById(id)
    .then(truck => {
      res.status(200).json(truck);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving truck info',
        errorName:err.name,
        errorMessage:err.message
      });
    })
});
 


// POST /api/trucks/
//---------------------------------

/*
  {
    "ownerID":14,
    
    "name":"Cleo's Cupcakes",
    "type":"Dessert",
    "photoUrl":"https://www.bakemag.com/ext/resources/images/w/i/c/k/e/k/c/u/u/r/2018/WickedGoodCupcakes_Truck.jpg",
    "location":2
  }
*/

router.post('/', restricted, (req, res, next)=>{
  const newTruck = req.body;

  //next: add operator_id as second arg to addNewTruck
  //functionality thru db method

  Trucks.addNewTruck(newTruck)
    .then(truck => {
      res.status(201).json(truck);
      next();
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error adding truck',
        errorName:err.name, 
        errorMessage:err.message,
      });
    });
});


// PUT /api/trucks/
//---------------------------------
/*
  {
    "ownerID":14,
    
    "name":"Cleo's Cupcakes",
    "type":"Dessert",
    "photoUrl":"https://www.bakemag.com/ext/resources/images/w/i/c/k/e/k/c/u/u/r/2018/WickedGoodCupcakes_Truck.jpg",
    "location":2
  }
*/

router.put('/:id', restricted, (req,res)=>{
  const {id} = req.params;
  const changes = req.body;

  Trucks.updateTruck(changes, id)
    .then(truck=>{
      res.status(201).json(truck);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        message:'Server error retrieving updating truck info',
        errorName:err.name, 
        errorMessage:err.message,
      });
    })

});




// DELETE /api/trucks/:id
//---------------------------------

//needs checkOwned validation

router.delete('/:id', restricted, (req,res)=>{
  const id = req.params.id;

  Trucks.getTruckById(id)
  .then(truck => {
    res.status(200).json({message:'Deleted successfully', truck:truck});
  })
  .catch(err=>{
    console.log(err);
    res.status(500).json({
      message:'Server error deleting truck info',
      errorName:err.name,
      errorMessage:err.message
    });
  })
});

//export
module.exports = router;
