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
app.use("/customerinvoice",require("./controller/sales/customerInvoiceController"))
app.use("/customerinvoicedetail",require("./controller/sales/customerInvocieDetailController"))
app.use("/customerpayment",require("./controller/sales/customerPaymentController"))

app.use("/supplier",require("./controller/expenses/supplierController"))
app.use("/supplierinvoice",require("./controller/expenses/supplierInvocieController"))
app.use("/supplierinvoicedetail",require("./controller/expenses/supplierInvocieDetailController"))
app.use("/supplierpayment",require("./controller/expenses/supplierPaymentController"))

app.use("/transaction", require("./controller/transaction/transactionController"))

app.use("/category",require("./controller/stock/categoryController"))
app.use("/product",require("./controller/stock/productController"))

app.use("/account",require("./controller/account/accountController"))
app.use("/financialyear",require("./controller/account/financialyearController"))


app.listen("3000")