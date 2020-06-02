const app= require('./app')

// const express = require('express')
// require('./db/mongoose')
// const userRouter = require('./routers/users')
// const productRouter =require('./routers/products')
// //const orderRouter= require('./routers/orders')
// const bcrypt= require('bcryptjs')
// //const orederRouter = require('./routers/orders')


//const app = express()
const port = process.env.PORT

// app.use(express.json())
// app.use(userRouter)
// app.use(productRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


