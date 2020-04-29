const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../auth/secrets");
const db = require("../data/dbConfig");

/** GET ENDPOINTS **/
router.get("/list/:index",(req,res)=>{
    if(req.params.index>12||req.params.index<=0){
        return res.status(403).json({message:"Only pages 1 trough 12 are available."})
    }
    get10kSongs(req.params.index-1).then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error fetching the songs"})
    })
})

router.get("/list/",(req,res)=>{
    get10kSongs().then(data=>{
        res.status(200).json(data);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error fetching the songs"})
    })
})

router.get("/liked",(req,res)=>{
    getIDbyusername(req.headers.authorization).then(id=>{
        db("users_liked").where({"user_id":id})
        .join("spotifytable", function(){
            this.on("users_liked.track_id","=","spotifytable.id")
        }).select("*")
        .orderBy("spotifytable.id")
        .then(data=>{
            res.status(200).json(data);
        }).catch(err=>{
            console.log(err);
            res.status({message:"Error retrieving liked songs"})
        })
    })
})

/** POST ENDPOINTS **/
router.post("/liked",(req,res)=>{ // this will give all the song that are liked by the logged in user
    if(!(req.body.track_id)){
        return res.status(403).json({message:"Please provide the track ID"})
    }
    getIDbyusername(req.headers.authorization).then(id=>{
        db("users_liked").insert({"user_id":id,"track_id":req.body.track_id}).then(data=>{
            data.length>0?res.status(200).json({message:"Song added to liked list"}):res.status(500)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({message:"Error adding song"})
        })
    })
})

router.post("/",(req,res)=>{ //This will give out the song by that id
    if(!(req.body.id)){
        return res.status(403).json({message:"Missing track ID"})
    }
    getByTrackID(req.body.id).then(data=>{
        data
        ?res.status(200).json(data)
        :res.status(404).json({message:"Couldn't find song with that track id"})
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:"Error fetching song by that ID"})
    })
})

module.exports = router;

function get10kSongs(index=0){
    return db("spotifytable").select("*").orderBy("id").where("id",">",10000*index).limit(10000);
}

function getByTrackID(id){
    return db("spotifytable").select("*").where({id}).first();
}

function getIDbyusername(token){
    const {username} = jwt.verify(token,secrets.secret);
    return db("Users").select("id").where({"username":username}).first().then(({id})=>{
        return id;
    })
}