const express = require('express');
const placeController = require('../controllers/placeController');
const router=express.Router()
router.get('/get-place-photo',placeController.get_photo);
module.exports=router