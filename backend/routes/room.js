const express = require('express')
const { FAILED,SUCCESS } = require('../utils/entity')
const router = express.Router()
const Room = require('../models/Room')

router.get('/', async(req, res)=>{
    try {
        const rooms = await Room.find().populate('user')
        res.json(SUCCESS(rooms))
    } catch (error) {
        res.json(FAILED(error))
    }
})
router.post('/', async(req, res) => {
    const {name, userId} = req.body
    const newRoom = new Room({name:name, user: userId})
    try {
        const roomSaved = await newRoom.save()
        res.json(SUCCESS(roomSaved))
    } catch (error) {
        res.json(FAILED(error))
    }
})
router.patch('/:roomId', async(req, res) => {
    const {name} = req.body
    try {
        const updateRoom = await Room.updateOne(
            {_id:req.params.roomId},
            {$set:{name:name,lastActive:Date.now()}
        })
        res.json(SUCCESS(updateRoom))
    } catch (error) {
        res.json(FAILED(error))
    }
})

router.delete('/:roomId', async(req, res) => {
    const {name} = req.body
    try {
        const removeRoom = await Room.remove(
            {_id:req.params.roomId}
        )
        res.json(SUCCESS(removeRoom))
    } catch (error) {
        res.json(FAILED(error))
    }
})

module.exports = router