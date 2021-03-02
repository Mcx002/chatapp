require('dotenv/config')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const mongoose = require('mongoose')
const cors = require('cors')
const Message = require('./models/Message')
const User = require('./models/User')
const io = require('socket.io')(http,{
    allowEIO3: true,
    cors: {
        origin:'*'
    }
})

io.on('connection',socket=>{
    console.log('a user connected')
    socket.on('chat message',async(payload)=>{
        const {userId, roomId, message} = payload
        const newMessage = new Message({message,user:userId,room:roomId})
        try{
            // const user = await User.findOne({_id:payload.userId},'username')
            const saveMessage = await newMessage.save()
            // let data = {...payload, user}
            let data = await saveMessage.populate('user room').execPopulate()
            io.emit(payload.roomId, data)
            // console.log(SUCCESS(data))
        }catch(e){
            console.log(e)
        }
    })
})
// Middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

// Routes
const authRoutes = require('./routes/auth')
const roomRoutes = require('./routes/room')
const messageRoutes = require('./routes/messages')
const {SUCCESS} = require("./utils/entity");

app.use("/auth", authRoutes)
app.use("/rooms", roomRoutes)
app.use("/messages", messageRoutes)

app.get('/', (req, res) => {
    res.send('<h1>Hellow rold</h1>')
})

mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true, useUnifiedTopology: true},
    ()=> console.log("db connected"))

http.listen(3000, ()=>{
    console.log('listening on *:3000')
})