const Users = require('./usersModel');

module.exports = {
  uniqueName,
  // userExists,
  uniqueEmail,
  validRegister,
  // validLogin
}

async function uniqueName (req,res,next){
  // foundUsername = users.getByUsername
  const pendingName = req.body.username;

  const foundName = await Users.getUserByName(pendingName); 
  // console.log(foundName);
  if(foundName){
    return res.status(400).json({message:"That email or username is already taken. Please enter a unique email and username."});
  }else{
    next();
  }
}

async function uniqueEmail (req,res,next){
  // foundUsername = users.getByUsername
  const pendingEmail = req.body.email;

  const foundEmail = await Users.getUserByEmail(pendingEmail); 
  // console.log(foundEmail);
  if(foundEmail){
    return res.status(400).json({message:"That email or username is already taken. Please enter a unique email and username."});
  }else{
    next();
  }
}

function validRegister (req,res,next){
  if(req.body.username && req.body.password && req.body.email){
    next();
  }else{
    res.status(400).json({message:"Required fields: username (string), password (string), email(string) Optional: location(integer)"})
  }
}

// function validLogin (req,res,next){
//   next();
// }