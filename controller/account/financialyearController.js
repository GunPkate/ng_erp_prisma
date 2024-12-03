const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.financialYear.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ error: e.message })        
    }
})

app.post('/create', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.financialYear.create({data: 
            { 
                financialYearId: getData.financialYearId,
                financialYear: getData.financialYear,
                isActive: getData.isActive,
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
        const data = await prisma.financialYear.delete( { where: { financialYearId: getData.financialYearId} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ error: e.message })   
    }
})



module.exports = app