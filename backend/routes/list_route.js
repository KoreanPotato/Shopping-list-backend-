const express = require('express');
const router = express.Router();
const listController = require('../controllers/list_controller');

router.post('/createList/:id', listController.createList);
router.delete('/deleteList/:id', listController.deleteList);
router.get('/lists', listController.getAllLists)

module.exports = router