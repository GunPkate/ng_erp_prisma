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
                status: getData.status,
                quantity: getData.quantity,
                price: getData.price,
                description: getData.description,
                expiryDate: getData.expiryDate,
                manuDate: getData.manuDate,
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

app.post('/genproduct', async (req, res) => {
    try {
        const getData = req.body
        const data = await prisma.product.create({data: {
            id: getData.id,
            productName: getData.productName,
            stockThresholdQty: getData.stockThresholdQty,
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

app.get('/productlist', async (req, res) => {
    try {
        const data = await prisma.product.findMany({})  
        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
        })      
    }
})

app.post('/productdelete', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.product.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
        })     
    }
})

module.exports = app