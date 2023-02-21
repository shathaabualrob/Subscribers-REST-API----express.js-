// call mongoose library
const mongoose = require('mongoose')
// this will allow us to create a model that will interact with the db

// create a schema
const subscriberSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subscriberToChannel:{
        type: String,
        required: true
    },
    subscribeDate:{
        type: Date,
        required: true,
        default: Date.now
    }
}) 

//export this schema out of this module
// the mongoose.model function takes 2 arguments. 
// 1st is the name of our model in the db
// 2nd is the schema that corresponds that model
module.exports = mongoose.model('Subscriber', subscriberSchema)

// now go and include this module in the subscriber route module in routes/subscrubers.js
