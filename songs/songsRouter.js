const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("songs songs");
})

module.exports = router;