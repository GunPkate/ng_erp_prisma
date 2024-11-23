const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.supplier.findMany()
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
        const data = await prisma.supplier.create({data: 
            { 
                supplier_id: getData.supplier_id,
                supplier_name: getData.supplier_name,
                address: getData.address ,
                email: getData.email ,
                contact_no: getData.contact_no ,
                description: getData.description ,
            }
        })
        res.send(data)
    } catch (e) {
         res.send(e.message)   
    }
})

module.exports = app