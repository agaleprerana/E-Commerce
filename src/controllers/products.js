const express = require('express')
const productRouter = require('../routers/products')
const Product= require('../models/products')
const jwt= require('jsonwebtoken')
const auth = require('../middleware/auth')


const add_product=async (req, res) => {
    const product = new Product(req.body)

    try {
        await product.save()
        //const token=await user.generateAuthToken()
        res.status(201).send(product)
    } catch (e) {
        res.status(400).send(e)
    }
}

const find_all_products=async (req, res) => {
    try {
        const products = await Product.find({})
        res.send(products)
    } catch (e) {
        res.status(500).send()
    }
}

const update_product=async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name','price','category','quantity',"instock"]
    const isValidOperation = updates.every((update)=> allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error: 'invalid operations'})
    }
    
    try {
        const product = await Product.findById(req.params.id)
        updates.forEach((update) => product[update] = req.body[update])
        
        await product.save()
        
        //const user = await User.findByIdAndUpdate(req.params.id,req.body,{new: true, runValidators: true})
        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    } catch (e) {
        res.status(400).send()
    }
}

const delete_product=async (req,res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id)
        if(!product){
            return res.status(404).send()
        }
        res.send(product)
    } catch(e) {
        res.status(500).send()
        //console.log(e)
    }
}

const total_amount =async(req,res)=>{
    
    try{
        var total = 0
        
        console.log(req.user.order[0])
        
        Array.from(req.user.order).forEach(order=>{
            console.log(order.name)
            total = total +order.price
        })
        console.log(total)
        res.send({ message: 'total amount is ' +total})
    } catch(e){
        console.log(e)
        res.send({message: 'total cannot be calculated'})
    }
    
}

const category= async(req,res)=>{
    try{
        console.log(req.params.category)
        let query= req.params.category== 'null'?{}:{"category":req.params.category}
        const products= await Product.find(query)
        //console.log('123')
        res.send({products})
    }catch(e){
        console.log(e)
        res.sendStatus(500).send()
       // res.send(e)
    }
}




module.exports={
    "add_product":add_product,
    "find_all_products":find_all_products,
    "update_product":update_product,
    "delete_product":delete_product,
    "total_amount":total_amount,
    "category":category
}