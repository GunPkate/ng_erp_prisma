const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.supplierInvoice.findMany({include: {supplierInvoiceDetail: true, supplierPayment: true} })
        console.log(data)
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData)
        const data = await prisma.supplierInvoice.create({data: 
            { 
                id: getData.id,
                invoiceNo: getData.invoiceNo,
                supplierId: getData.supplierId,
                date: getData.date,
                title: getData.title,
                description: getData.description,
                userId: getData.userId, 
                totalAmount: getData.totalAmount        
            }
        })
        res.send(data)
    } catch (e) {
        console.log("data error",e )
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })   
    }
})

app.post('/delete', async (req,res)=>{
    try {
        const getData = req.body
        console.log(1234,getData.id)
        // const data2 = await prisma.supplierInvoiceDetail.delete( { where: { supplierInvoiceId: getData.id} } )
        const data = await prisma.supplierInvoice.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

module.exports = app