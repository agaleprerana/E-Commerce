const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')

const userSchema = new mongoose.Schema({
     
     
     
         category:{
             type: String,
             required:true
         },
         name:{
             type:String,required:true
         },
        quantity:{
            type: Number,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
    instock:{
        type: Boolean,required:true
    },default:""
       
     
})


const Product = mongoose.model('Product', userSchema)

module.exports = Product