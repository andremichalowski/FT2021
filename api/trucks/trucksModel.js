const db = require('../../data/dbConfig');


module.exports={
  getTrucks,
  getTruckById,
  getTruckByName,
  addNewTruck,
  updateTruck,
}

// GET ALL 
function getTrucks(){
  return db('trucks');
}

function getTruckById(id){
  return db('trucks')
    .where('trucks.id',id)
    .first()
    ;
}

function getTruckByName(username){
  return db('trucks')
    .where('trucks.username',username)
    .first()
    ;
}

//ADD NEW
async function addNewTruck(truck){
  //validate: name/email are unique
  //validate: all fields present
  //initialize: set role to match endpoint
  try{

  const [id] = await db('trucks').insert(truck);
  console.log('Insert successful! ID of new record:',id);

    return Promise.resolve(getTruckById(id));
  }catch(err){
    return Promise.resolve(err);
  }

  // console.log({user:created});
  // return Promise.resolve({user:created});
}

async function updateTruck(changes, id){
  await db('trucks')
    .where('trucks.id', id)
    .update(changes);

  return db('trucks')
    .where('trucks.id', id)
    .first();
}