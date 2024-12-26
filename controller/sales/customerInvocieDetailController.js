const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all:invoiceno',async (req,res)=>{
    try {
        let param = req.params.invoiceno.replace(':','')

        const data = await prisma.customerInvoiceDetail.findMany({where: { customerInvoiceId: param } })

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

        const data = await prisma.customerInvoiceDetail.create({data: 
            { 
                id: getData.id,
                customerInvoiceId: getData.customerInvoiceId,
                productId: getData.productId,
                saleQty: getData.saleQty,
                saleUnitPrice: getData.saleUnitPrice,    
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

        const data = await prisma.customerInvoiceDetail.delete( { where: { id: getData.id} } )
        let checkData = await prisma.transaction.count({ where: { invoiceDetailsId: getData.id } })
        console.log(checkData)
        if(checkData > 0){
            let deleteData = await prisma.transaction.deleteMany({ where: { invoiceDetailsId: getData.id } })
            console.log(deleteData)
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