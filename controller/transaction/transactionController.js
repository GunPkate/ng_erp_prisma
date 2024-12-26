const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.transaction.findMany()
        
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
        const data = await prisma.transaction.create({data: 
            { 
                id: getData.id,
                financialYearId: getData.financialYearId,
                accountHeadCode: getData.accountHeadCode,
                accountControlCode: getData.accountControlCode,
                accountSubcontrolCode: getData.accountSubcontrolCode,
                invoiceNo: getData.invoiceNo,
                invoiceDetailsId: getData.invoiceDetailsId,
                userId: getData.userId,
                credit: getData.credit,
                debit: getData.debit,
                transactionDate: getData.transactionDate,
                transactionTitle: getData.transactionTitle,
                description: getData.description,
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
        const data = await prisma.transaction.delete( { where: { id: getData.id} } )
        
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

module.exports = app