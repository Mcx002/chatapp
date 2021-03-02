    const mongoose = require('mongoose')

const RoomSchema = mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    lastActive:{
        type:Date,
        default: Date.now()
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Room', RoomSchema)