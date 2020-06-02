const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const productRouter =require('./routers/products')
//const orderRouter= require('./routers/orders')
const bcrypt= require('bcryptjs')
//const orederRouter = require('./routers/orders')


const app = express()
//const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(productRouter)


module.exports=app

