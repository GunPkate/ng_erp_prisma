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

app.use("/usertype",require("./controller/user/userTypeController"))
app.use("/user",require("./controller/user/userController"))

app.use("/customer",require("./controller/sales/customerController"))
app.use("/supplier",require("./controller/expenses/supplierController"))

app.use("/account",require("./controller/account/accountController"))


app.listen("3000")