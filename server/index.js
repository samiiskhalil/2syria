const mongoose = require('mongoose');
const axios=require('axios')
const cors = require('cors');
const userRouter=require('./routes/userRoutes')
const placeRouter=require('./routes/placeRoutes')
const express = require('express')
require('dotenv').config()
const app=express()
async function run(){
  const port=process.env.PORt||3000
await  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    family:4,
    useUnifiedTopology: true,
  }).catch((err)=>console.log(err))
  console.log(`connected to database ${process.env.DATABASE_URL}`)
  app.use(cors({
    origin:'*'
  }))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/user',userRouter)
app.use('/api/place',placeRouter)
await app.listen(port)
console.log(`server is running on port ${port}`)

}
run()