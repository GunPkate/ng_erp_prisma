const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all:invoiceno',async (req,res)=>{
    try {
        let param = req.params.invoiceno.replace(':','')
        console.log("req.params",param)
        const data = await prisma.supplierInvoiceDetail.findMany({where: { supplierInvoiceId: param } })
        console.log("req.params",data)
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData)
        const data = await prisma.supplierInvoiceDetail.create({data: 
            { 
                id: getData.id,
                supplierInvoiceId: getData.supplierInvoiceId,
                productId: getData.productId,
                purchaseQty: getData.purchaseQty,
                purchaseUnitPrice: getData.purchaseUnitPrice,    
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
        console.log(1234,getData.id)
        const data = await prisma.supplierInvoiceDetail.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

module.exports = app