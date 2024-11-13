const express = require('express');
const router = express.Router();
const { controller } = require('../controllers/userController');

router.post('/registeruser', controller.registerUser);
router.post('/updateuser', controller.updateUser); 
router.post('/deleteuser', controller.deleteUser); 
router.post('/changepassword', controller.changePassword); 
router.post('/login', controller.loginUser);
router.get('/getAllUsers', controller.getAllUsers); 

module.exports = router;
