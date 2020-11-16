const express = require('express');		
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router.js");
const usersRouter = require('../routes/users/users-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use('/users', usersRouter );

server.get('/', (req, res) => {
	res.status(200).json({ Test: "server endpoint from BW project"});
})

module.exports = server;