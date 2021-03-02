const express = require('express')
const { FAILED, SUCCESS } = require('../utils/entity')
const router = express.Router()
const Message = require('../models/Message')
const User = require('../models/User')

router.get('/:roomId', async(req, res) => {
    try {
        const messages = await Message.find({room:req.params.roomId}).populate('user room','username lastActive createdAt name').limit(10)

        res.json(SUCCESS(messages))
    } catch (error) {
        res.json(FAILED(error))
    }
})
router.post('/:roomId', async(req, res) => {
    const {userId, message} = req.body
    const newMessage = new Message({userId: userId, roomId: req.params.roomId, message: message})
    try {
        const messageSaved = await newMessage.save()
        res.json(SUCCESS(messageSaved))
    } catch (error) {
        res.json(FAILED(error))
    }
})

module.exports = router