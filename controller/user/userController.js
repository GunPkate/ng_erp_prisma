const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.user.findMany()
        
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

        const data = await prisma.user.create({data: 
            { 
                userId	: getData.userId,
                firstName: getData.firstName,
                lastName: getData.lastName,
                email: getData.email,
                contactNo: getData.contactNo,
                username: getData.username,
                password: getData.password,
                userTypeId: getData.userTypeId,
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
        const data = await prisma.user.delete( { where: { userId: getData.userId} } )
        
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

module.exports = app