const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/acchead/all',async (req,res)=>{
    try {
        const data = await prisma.accountHead.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })          
    }
})

app.post('/acchead/create', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.accountHead.create({data: 
            { 
                id: getData.id,
                accountHeadName: getData.accountHeadName,
                code: getData.code,
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

app.post('/acchead/delete', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.accountHead.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

app.get('/acccontrol/all',async (req,res)=>{
    try {
        const data = await prisma.accountControl.findMany()
        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })          
    }
})

app.post('/acccontrol/create', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.accountControl.create({data: 
            { 
                id: getData.id,
                accountControlName: getData.accountControlName, 
                code: getData.code, 
                accountHeadCode: getData.accountHeadCode
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

app.post('/acccontrol/delete', async (req,res)=>{
    try {
        const getData = req.body
        const data = await prisma.accountControl.delete( { where: { id: getData.id} } )
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

app.get('/acchead/filter',async (req,res)=>{
    try {
        const data = await prisma.$queryRaw`select ah.account_head_name accountHeadName, ah.code headCode, ac.account_control_name accountControlName, ac.code controlCode, t.transaction_title title, sum(debit) debit, sum(credit) credit
        from "transaction" t
        left join "accountControl" ac on ac.code = t.account_control_code 
        left join "accountHead" ah  on ac.account_head_code = ah.code 
        group by accountHeadName, headCode, accountControlName, controlCode, t.transaction_title, debit , credit;`
        res.send(data)
    } catch (e) {
        res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })          
    }
})

module.exports = app