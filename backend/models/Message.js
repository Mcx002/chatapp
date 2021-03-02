const mongoose = require('mongoose')

const MessageSchema = mongoose.Schema({
    message:{
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Room'
    }
})

module.exports = mongoose.model("Message", MessageSchema)