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
server.get("/",(req,res)=>{
    res.json({message:"api up",
        auth_endpoints:{
            login:"POST /api/auth/login",
            register:"POST /api/auth/register"
        },
        music_endpoints:{
            message:"under development",
        }
    });
})

module.exports = server;