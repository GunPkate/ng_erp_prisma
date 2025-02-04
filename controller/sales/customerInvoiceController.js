const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.customerInvoice.findMany({include: {customerInvoiceDetail: true, customerPayment: true} })
        
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

        const data = await prisma.customerInvoice.create({data: 
            { 
                id: getData.id,
                invoiceNo: getData.invoiceNo,
                customerId: getData.customerId,
                date: getData.date,
                title: getData.title,
                description: getData.description,
                userId: getData.userId, 
                totalAmount: getData.totalAmount        
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

        // const data2 = await prisma.customerInvoiceDetail.delete( { where: { customerInvoiceId: getData.id} } )
        const data = await prisma.customerInvoice.delete( { where: { id: getData.id} } )
        let checkData = await prisma.transaction.count({ where: { invoiceNo: getData.invoiceNo } })
        if(checkData > 0){
            let deleteData = await prisma.transaction.deleteMany({ where: { invoiceNo: getData.invoiceNo } })
            console.log(deleteData)
        }
        let checkInvoiceDetail = []
        checkInvoiceDetail = getData.customerInvoiceDetail.map(x=>x.id)

        if(checkInvoiceDetail.length > 0){
            await prisma.stock.deleteMany({where: { invoiceDetailId: { in : checkInvoiceDetail} }})
        }
        res.send(data)
    } catch (e) {
         res.status(500).json({ 
            error: e.message,
            meta: e.meta
          })     
    }
})

module.exports = app