const express = require('express')
const app = express.Router();
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient;

app.get('/all',async (req,res)=>{
    try {
        const data = await prisma.user.findMany()
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
        const data = await prisma.user.create({data: 
            { 
                first_name: getData.first_name,
                last_name: getData.last_name,
                email: getData.email ,
                contact_no: getData.contact_no ,
                username: getData.username ,
                password: getData.password ,
                user_type_id: getData.user_type_id,
            }
        })
        res.send(data)
    } catch (e) {
         res.send(e.message)   
    }
})

module.exports = app