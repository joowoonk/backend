const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../auth/secrets");
const db = require("../data/dbConfig");


router.get("/",(req,res)=>{
    db("spotifytable").select("*").limit(400).then(data=>{
        console.log(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error fetching the songs"})
    })
})


router.post("/liked",(req,res)=>{
    if(!(req.body.trackid)){
        return res.status(403).json({message:"Please provide the track ID"})
    }
    const {username} = jwt.verify(req.headers.authorization,secrets.secret)
    db("Users").where({username}).select("id").first().then(userID=>{
        
        console.log(userID);
        //Now that we have this we would put insert the trackID & the userID;
    })
})
router.get("/recommended",(req,res)=>{
    const {username} = jwt.verify(req.headers.authorization,secrets.secret)
    db("Users").where({username}).select("id").first().then(userID=>{
        console.log(userID);
        //Now that we have this we would want to get all the songs that are linked to the userID
    })
})

module.exports = router;