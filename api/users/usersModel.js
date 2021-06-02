const db = require('../../data/dbConfig');


module.exports={
  getUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addNewUser,
  ownedTrucks,
}

// GET ALL 
function getUsers(){
  return db('users');
}

function getUserById(id){
  return db('users')
    .where('users.id',id)
    .first()
    ;
}

function getUserByName(username){
  return db('users')
    .where('users.username',username)
    .first()
    ;
}

function getUserByEmail(email){
  return db('users')
    .where('users.email',email)
    .first()
    ;
}

//ADD NEW
async function addNewUser(user){
  //validate: name/email are unique
  //validate: all fields present
  //initialize: set role to match endpoint

  //insert user
  try{

  const [id] = await db('users').insert(user);
  console.log('----------------');
  console.log('ID:',id);
  console.log('----------------');

    return Promise.resolve(getUserById(id));
  }catch(err){
    return Promise.resolve(err);
  }
  // //return newly created user
  // const created = db('users')
  //   .where('users.id',id)
  //   .first();

  // console.log({user:created});
  // return Promise.resolve({user:created});
}

//GET TRUCKS OWNED
async function ownedTrucks(userId){
  return db('owned_trucks')
    .join('trucks','owned_trucks.truck_id','trucks.id')
    .select('trucks.*')
    .where('owned_trucks.user_id',userId)
  ;
}
