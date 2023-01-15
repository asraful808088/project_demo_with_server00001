const express = require('express')
const {create}  =require('./controller')
const  {isValid} = require('../middleware/create_user/createUser')
const  route =express.Router()
route.post('/',isValid,create)
module.exports=route