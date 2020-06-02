const express = require('express')
const userRouter = require('../routers/users')
const User= require('../models/users')
const jwt= require('jsonwebtoken')
const auth = require('../middleware/auth')


const create_user =async(req,res)=>{
    const user = new User(req.body)

    try {
        await user.save()
        const token=await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
        console.log(e)
    }
}

const user_login = async(req,res)=>{
    {
        
        try {
            const user = await User.findByCredentials(req.body.email, req.body.password)
            const token = await user.generateAuthToken()
            res.send({ user, token })
        } catch (e) {
            res.status(400).send()
        }
    }
}

const user_profile =async(req,res)=>{
    
        res.send(req.user)
    
}

const user_logout =async(req,res)=>{

      console.log(req.user)
      try {
          req.user.tokens = req.user.tokens.filter((token) => {
              return token.token !== req.token
          })
          await req.user.save()
  
          res.send({message:"User logout successfully"})
          
      } catch (e) {
          console.log(e)
          res.status(500).send()
         
      }
  }

  const user_logoutAll=async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send({message:"Logged out successfully"})
    } catch (e) {
        res.status(500).send()
    }
}

const delete_user = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
        
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
}

const cart=async(req,res)=>{
    
    try{
        
        
        const ProData = await Product.findOne({_id: req.params.id})
        if(ProData.quantity > 0){
            const user = await User.findOneAndUpdate({_id:req.user._id},{$push:{order:{name:ProData.name,price:ProData.price,quantity:1,status:"Unprocessed"}}})
            await Product.updateOne({_id:req.params.id},{$inc:{quantity: -1}})
            console.log(ProData.quantity)
            res.send(user)
        }else{
            console.log('product is out of stock')
            await Product.updateOne({_id:req.params.id},{$set:{instock : false}})
            return res.send({message:'This product is out of stock'})
        }
        res.send({message: 'product is added to cart successfully'})
        req.user.save()

    }catch(e){
        console.log(e)
        console.log('no product')
        res.send({message:'No product'})
    }

}

const update_user =async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password','address']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        //to get middleware constantly running----
        const user = await User.findById(req.params.id)

        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        //--------
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
}


module.exports = {
    "create_user":create_user,
    "user_login":user_login,
    "user_profile":user_profile,
    "user_logout":user_logout,
    "user_logoutAll":user_logoutAll,
   "delete_user":delete_user,
   "cart":cart,
   "update_user":update_user
}

