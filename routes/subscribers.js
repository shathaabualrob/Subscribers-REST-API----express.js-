// we need to import this here again since it is used by all our application
const { json } = require('express')
const express = require('express')
// we wan the router version of express here
const router = express.Router()
// include the subscriber model
const Subscriber = require('../models/subscriber')

// getting all 
// it is and async function because it interacts with the db
router.get('/', async (req,res) => {
    // res.send('hello world')
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
// getting one
// call teh middleware getSubscriber
router.get('/:id', getSubscriber, (req,res) =>{
    res.json(res.subscriber)
})
// creating one
router.post('', async (req,res)=>{
    const subsriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel,

    })
    try {
        const newSubscriber = await subsriber.save()
        res.status(201).json(newSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// updating one
router.put('/:id',getSubscriber, async (req, res) => {
    // get what's in the req body an update what the object resulting from the middleware
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscriberToChannel != null){
        res.subscriber.subscriberToChannel = req.body.subscriberToChannel
    }
    try {
        const updatedSubscriber = await res.subscriber.save()
        res.status(201).json(updatedSubscriber)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})
// deleting one
router.delete('/:id',getSubscriber, async (req, res) => {
    try {
        await res.subscriber.remove()
        res.json({message: 'Deleted Successfully.'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// instead of getting the user through its id each time, we can use a middleware function
// this function just does some logic and tehn goes to the next function which is the call back function
async function getSubscriber (req, res, next){
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null){
            return res.status(404).json({message: 'Cannot find subscriber'})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    // if there was a subscriber we want to add it to the res
    // so that it can be accessed throught this object in the callback fucntions
    res.subscriber = subscriber
    // call teh next function that is after this middleware
    next()
}

//just export the router for now to fix the errors
module.exports = router