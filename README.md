# E-Commerce

# This project runs locally using port 3000.


# INSTALLATION
1. Node js
2. Visual Studio code
3. Postman
4. Mongodb

# STEPS TO RUN PROJECT

1) npm init

2) Installing npm packages
   1. npm i mongoose@8.5.1
   2. npm i validator@13.0.0
   3. npm i bcryptjs@2.4.3
   4. npm i jsonwebtoken@8.5.1
   5. npm i express@4.17.1
   6. npm i nodemon@2.0.4 --save-dev
   7. npm i env-cmd@8.0.2
   8. npm i jest@23.6.0 --save-dev
   9. npm i supertest@3.4.1 --save-dev

3) Changes in package.json file
   "scripts": {
    "start": "node src/index.js",
    "dev": "env-cmd ./config/dev.env nodemon src/index.js",
    "test": "env-cmd ./config/test.env jest --watchAll"
  },
  "jest": {
    "testEnvironment": "node"
  }

4) Start Mongodb server

5) Command to run project
      npm run dev

# Run requests using postman

1. registration of user

POST    localhost:3000/api/users/register

Body:
{
	
	"name": "test",
	"email": "test@gmail.com",
	"password":"test@123456",
	"address":{
		"area":"Pimpri",
		"city":"pune",
		"pincode":"411018"
	}
}

2. Login

POST      localhost:3000/api/users/login

Body:
{
	"email":"test@gmail.com",
	"password":"test@123456"
}

3. User profile

GET        localhost:3000/api/users/me

Headers:
 key: Authorization
 value: Bearer token-generated

4. Logout

POST     localhost:3000/api/users/logout

Headers:
 key: Authorization
 value: Bearer token-generated

5. Lgout all

POST     localhost:3000/api/users/logoutAll

Headers:
 key: Authorization
 value: Bearer token-generated

6. Delete user account

DELETE     localhost:3000/api/users/me

Headers:
 key: Authorization
 value: Bearer token-generated

7. Add products

POST      localhost:3000/api/products

body: 
{       "category":"Vegetables",                                                        
        "name" : "lady finger",
        "quantity" : 50,
        "price" : 35,
         "instock" : true
}


8. Display all products

GET        localhost:3000/api/products


9. Display product according to category

GET        localhost:3000/api/products/your-category

10. cart

GET        localhost:3000/users/cart/product-id

Headers:
 key: Authorization
 value: Bearer token-generated

11. Update Product

PATCH      localhost:3000/products/product-id

Body:
{
	"quantity":"50"
}

Header:
 key: Authorization
 value: Bearer token-generated

12. Total amount in cart

GET        localhost:3000/products/cart/total

Header:
 key: Authorization
 value: Bearer token-generated

 13. Delete product

DELETE    localhost:3000/products/product-id

14. Update user

PATCH    localhost:3000/api/users/user-id

body:
{
   "name":"testing"
}

# To run tests

npm run test




