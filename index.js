const server = require("./api/server");
require("dotenv").config()


const port = process.env.PORT || 5928
server.listen(port, ()=>{
    console.log(`---Server Running on port ${port} ---`)
})