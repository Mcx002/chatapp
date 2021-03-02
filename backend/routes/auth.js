const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')
const { UNAUTHORIZED, INTERNAL_SERVER_ERROR } = require("../utils/statusCode")
const { SUCCESS, FAILED } = require("../utils/entity")

router.post('/', async(req, res)=>{
    const {username, password} = req.body
    try {
        let user = await User.findOne({username:username})
        if(user != null){
            bcrypt.compare(password, user.password, (err, result) => {
                if(result){
                    res.json(SUCCESS({_id:user._id, username: user.username}))
                }else{
                    res.sendStatus(UNAUTHORIZED)
                }
            })
        }else{
            let hashedPassword = await bcrypt.hash(password,10);
            let newUser = new User({username: username, password: hashedPassword})
            try {
                const postSave = await newUser.save()
                res.json(SUCCESS({_id:postSave._id,username:postSave.username}))
            } catch (error) {
                res.json(FAILED(error))
            }
        }
    } catch (error) {
        res.json(FAILED(error))
    }
})

module.exports = router