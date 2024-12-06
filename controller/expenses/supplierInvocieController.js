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
        console.log(getData.userType)
        const data = await prisma.supplier.create({data: 
            { 
                supplierId: getData.supplierId,
                supplierName: getData.supplierName,
                address: getData.address ,
                email: getData.email ,
                contactNo: getData.contactNo ,
                description: getData.description ,
            }
        })
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

app.post('/delete', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.supplier.delete( { where: { supplierId: getData.supplierId} } )
        console.log(data)
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

module.exports = app