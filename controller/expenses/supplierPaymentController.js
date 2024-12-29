const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all:invoiceno',async (req,res)=>{
    try {
        let param = req.params.invoiceno.replace(':','')

        const data = await prisma.supplierPayment.findMany({where: { supplierInvoiceNo : param } })

        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })          
    }
})

app.post('/create', async (req,res)=>{
    try {
        const getData = req.body

        const data = await prisma.supplierPayment.create({data: 
            { 
                paymentId : getData.paymentId,
                supplierId : getData.supplierId,
                supplierInvoiceNo : getData.supplierInvoiceNo,
                userId : getData.userId,
                invoiceNo : getData.invoiceNo,
                totalAmount : getData.totalAmount,
                paymentAmount : getData.paymentAmount,
                remainBalance : getData.remainBalance,
                date : getData.date, 
            }
        })
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

app.post('/delete', async (req,res)=>{
    try {
        const getData = req.body
        console.log("Date",getData)
        const data = await prisma.supplierPayment.delete( { where: { paymentId: getData.paymentId} } )
        let checkData = await prisma.transaction.count({ where: { invoiceDetailsId: getData.paymentId } })
        if(checkData > 0){
            let deleteData = await prisma.transaction.deleteMany({ where: { invoiceDetailsId: getData.paymentId } })
            console.log(deleteData)
        }
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

module.exports = app