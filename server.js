const express = require("express")
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors())

app.get("/test",(req,res)=>{
    res.send("test")
})

app.use("/user",require("./controller/user/userTypeController"))

app.listen("3000")