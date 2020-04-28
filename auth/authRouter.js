const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secrets = require("./secrets")

const db = require("../data/dbConfig");

router.post("/login",userValidation,(req,res)=>{
    const {username,password} = req.body;

    db("Users").select("*").where({username}).then(([user])=>{
        console.log(user);
        if(user && bcrypt.compareSync(password,user.password)){
            const token = generateToken(user);
            res.status(201).json({msg:"Authorized",token})
        }else{
            res.status(401).json({message: 'Not authorized'});
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    })

})

router.post("/register",userValidation,(req,res)=>{
    const credentials = req.body;
    //Find user in databe
    db("Users").select("username").where({username:credentials.username}).then(data=>{
        if(data.length==0){ //checks if user is already registered
            credentials.password = bcrypt.hashSync(credentials.password, 8); //hash password
        
            db("Users").insert(credentials).then(([id])=>{                   //Insert user in db
                db("Users").select("*").where({"id":id}).then(([user])=>{    //get new user in db
                    res.status(201).json(user);
                })
            });

        }else{
            res.status(201).json({message:"User is already registered"})
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({message:err});
    })
})

module.exports = router;

function userValidation(req,res,next){
    if(!(req.body.username)||!(req.body.password)){
        res.status(403).send({message:"Please make sure to provide both username and password"});
    }
    next();
}

function generateToken(user){
    const payload = {
        username: user.username,
    }
    const options = {
        expiresIn:"12h",
    }
    return jwt.sign(payload, secrets.secret, options);
}

  /* Another login option
  if(user){
            if(bcrypt.compareSync(password,user.password)){
                const token = generateToken(user);
                res.status(201).json({msg:"Authorized",token})
            }else{
                res.status(403).json({message:"Wrong password"});
            }

        }else{
            res.status(403).json({message:"Wrong username"});
        }
*/