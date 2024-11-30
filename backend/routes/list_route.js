const express = require('express');
const router = express.Router();
const listController = require('../controllers/list_controller');

router.post('/createList', listController.createList);
router.delete('/deleteList/:id', listController.createList);
router.get('/lists', listController.getAllLists)

module.exports = router