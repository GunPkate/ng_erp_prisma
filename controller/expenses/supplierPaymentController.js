const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all:invoiceno',async (req,res)=>{
    try {
        let param = req.params.invoiceno.replace(':','')

        const data = await prisma.supplierPayment.findMany({where: { invoiceNo: param } })

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

        const data = await prisma.supplierPayment.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

module.exports = app