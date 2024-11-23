const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;


app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.userType.findMany()
        console.log(data)
        res.send(data)
    } catch (e) {
        res.send(e.message)        
    }
})

app.post('/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData.userType)
        const data = await prisma.userType.create({data: { user_type: getData.userType }})
        res.send(data)
    } catch (e) {
         res.send(e.message)   
    }
})

module.exports = app