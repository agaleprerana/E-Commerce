const express = require('express')
const User = require('../models/users')
const Product = require('../models/products')
const jwt= require('jsonwebtoken')
const auth = require('../middleware/auth')
const userController = require('../controllers/users')
const router = new express.Router()


//registration
router.post('/api/users/register',userController.create_user)

//login

router.post('/api/users/login', userController.user_login)

//user profile
router.get('/api/users/me', auth, userController.user_profile)


//logout
router.post('/api/users/logout',auth, userController.user_logout)

//logout all
router.post('/api/users/logoutAll', auth, userController.user_logoutAll)


//delete user
router.delete('/api/users/me',auth,userController.delete_user)


//items in cart
router.get('/api/users/cart/:id',auth,userController.cart)

//update user
router.patch('/api/users/:id', userController.update_user)




module.exports = router