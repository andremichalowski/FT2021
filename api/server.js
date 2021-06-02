//require dependencies
const express = require('express');
const logger = require('./middleware/logger');
const cors = require('cors');
const helmet = require('helmet');


const restricted = require('./auth/restricted');
//require routers
const authRouter = require('./auth/authRouter');
const trucksRouter = require('./trucks/trucksRouter');
const usersRouter = require('./users/usersRouter');


//new server
const server = express();

//use middleware
server.use(express.json());
server.use(logger);

server.use(cors());
server.use(helmet());

//use routers
server.use('/api/auth', authRouter);
server.use('/api/trucks', restricted, trucksRouter)
server.use('/api/users', restricted, usersRouter)

//default response
server.get('/', (req,res)=>{
  res.status(200).json({message:"The server is running, better go catch it"});
});

server.get('/api', (req,res)=>{
  res.status(200).json({message:"Welcome to the api, please choose an endpoint. See backend documentation for server routes."});
});

//export server
module.exports = server;