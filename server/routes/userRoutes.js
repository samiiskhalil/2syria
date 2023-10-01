const userController=require('../controllers/userController.js')
const userMiddleware=require('../middleware/userMiddleware.js')
const authenticationMiddleware=require('../middleware/authentication.js')
const express = require('express');
const router=express.Router()
router.get('/validate-token',userController.validateToken)
router.post('/',authenticationMiddleware.vaildateInforomation,authenticationMiddleware.hashPassword,userMiddleware.createAccount,authenticationMiddleware.createToken,userController.sendAccount)
router.get('/login',userMiddleware.findUser,authenticationMiddleware.verifyPassword,authenticationMiddleware.createToken,userController.sendAccount)
router.get('/recover-account',authenticationMiddleware.findUserByEmail,authenticationMiddleware.checkCodeRequestFrequency,authenticationMiddleware.createVerificationCode,authenticationMiddleware.sendCode)
router.post('/recover-account',authenticationMiddleware.findUserByEmail,authenticationMiddleware.checkCode,authenticationMiddleware.createToken,userController.sendAccount)
module.exports=router