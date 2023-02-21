// load all variables from .env file
require('dotenv').config()
// import the express library
const express = require('express')
// create an app by running the express funtion
const app = express()
// import the mongoose library to help deal with mongodb
const mongoose = require('mongoose')
// connect to your mongodb through connection string
// this database is locan and it's name is 'subsribers'. This database will hold subscribers information, which is what out rest api is going to handle

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
// save the connection into a variable
const db = mongoose.connection
// this is called on each connection to the db to make sure each connection has nothing wrong
db.on('error', (error) => console.error(error))
// this event listener is applied when the connection is a success (it's called only once)
db.once('open', ()=> console.log('Connected to database...'))

// this is a code that runs when teh server gets a request but before it is passed to the routes
// now it is set to accept a json instead of a POST ar GET requests
app.use(express.json())

//create a router to route all our router information
const subsribersRouter = require('./routes/subscribers')
// now we tell our app that we want to use that route
app.use('/subscribers', subsribersRouter) // localhost:3000/subscribers

// Listen to port 3000 and this will aplly this function first each time we run this server
app.listen(3000, ()=> console.log('This server is listening on port 3000...'))

