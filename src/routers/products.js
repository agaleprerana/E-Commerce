const express = require('express')
const Product = require('../models/products')
const User =require('../models/users')
const auth= require('../middleware/auth')
const productController = require('../controllers/products')
const router = new express.Router()
//insert the products
router.post('/api/products', productController.add_product)


//find all products

router.get('/api/products', productController.find_all_products)


//find by category
router.get('/api/products/:category', productController.category)


//update product

router.patch('/api/products/:id',auth, productController.update_product)



//total amount

router.get('/api/products/cart/total',auth, productController.total_amount)

//delete product
router.delete('/api/products/:id', productController.delete_product)



module.exports = router
