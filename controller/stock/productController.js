const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.stock.findMany()
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

        const data = await prisma.stock.create({data: 
            { 
                id: getData.id,
                productId: getData.productId,
                catagoryId: getData.catagoryId,
                productName: getData.productName,
                quantity: getData.quantity,
                salePrice: getData.salePrice,
                currentPurchasePrice: getData.currentPurchasePrice,
                description: getData.description,
                expiryDate: getData.expiryDate,
                manuDate: getData.manuDate,
                stockThresholdQty: getData.stockThresholdQty,
                userId: getData.userId,
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
        const data = await prisma.stock.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})


module.exports = app