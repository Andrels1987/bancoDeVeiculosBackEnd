const express = require('express')
const path = require('path')
const pageRouter = express.Router();
const userRouter = express.Router();



pageRouter.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, '..','views','index.html'))
    
})
pageRouter.get('/user', (req, res) =>{
    res.sendFile(path.join(__dirname, '..','views','user.html'))
    
})



module.exports = {pageRouter}