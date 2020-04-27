const express = require("express");
const cors = require("cors");

const authRouter = require("../auth/authRouter");
const authenticator = require("../auth/authenticator");
const songsRouter = require("../songs/songsRouter");


const server = express();
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/songs", authenticator, songsRouter);
server.get("/", (req,res)=>{
    res.send({api:"up"})
})

module.exports = server;