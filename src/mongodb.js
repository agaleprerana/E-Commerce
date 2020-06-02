const mongodb = require('mongodb') 
const MongoClient = mongodb.MongoClient 
 
const connectionURL = 'mongodb://127.0.0.1:27017' 
const databaseName = 'e-commerce' 
 
MongoClient.connect(connectionURL,{ useUnifiedTopology: true }, { useNewUrlParser: true }, (error, client) => {     
    if (error) {         
        return console.log('Unable to connect to database!')   
      } 
      console.log('connected')
    const db = client.db(databaseName)   

}) 
 
