const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller')

router.post('/register', user_controller.registerUser);  
router.post('/login', user_controller.loginUser);  
router.get('/users', user_controller.getAllUsers)

module.exports = router;