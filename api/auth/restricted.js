const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./secrets');


module.exports = (req,res,next) =>{
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({message:'Missing required token'});
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    console.log('........')
    console.log('token:', token);
    console.log('secret:', jwtSecret);
    console.log('........')
    req.userId=decoded.subject;
    //request now has the user id attached

    if (err) {
      console.log(
        'decoded error ->', err.name, 
        '\n', 'message:', err.message, 
        '\n', 'decoded:', decoded
        );

      return res.status(401).json({message:'Bad token', token:token, errName:err.name, errMsg:err.message});
    }

    console.log('decoded token->', decoded);
    req.decodedJwt = decoded;
    next();
  });
};