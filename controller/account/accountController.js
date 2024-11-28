const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/acchead/all',async (req,res)=>{
    try {
        const data = await prisma.accountHead.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/acchead/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData.userType)
        const data = await prisma.accountHead.create({data: 
            { 
                id: getData.id,
                accounthead_name: getData.accounthead_name,
                code: getData.code,
            }
        })
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

app.get('/acccontrol/all',async (req,res)=>{
    try {
        const data = await prisma.accountControl.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/acccontrol/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData.userType)
        const data = await prisma.accountControl.create({data: 
            { 
                id: getData.id,
                accountcontrol_name: getData.accountcontrol_name,
                code: getData.code,
            }
        })
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

app.get('/accountsubcontrol/all',async (req,res)=>{
    try {
        const data = await prisma.accounaccountSubControltControl.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/accountsubcontrol/create', async (req,res)=>{
    try {
        const getData = req.body
        console.log(getData.userType)
        const data = await prisma.accountSubControl.create({data: 
            { 
                id: getData.id,
                accountsubcontrol_name: getData.accountsubcontrol_name,
                code: getData.code,
            }
        })
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})

module.exports = app