const getUser =require('express').Router()
const {userData} = require('./controller')
const authGuard = require('./../../authguard/authguard')  
getUser.get('/',authGuard,userData)



module.exports={getUser}