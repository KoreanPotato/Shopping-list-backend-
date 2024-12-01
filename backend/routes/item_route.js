const express = require('express');
const router = express.Router();
const itemController = require('../controllers/item_controller');

router.post('/list/:listId/item', itemController.addItemToList);
router.delete('/item/:itemId', itemController.removeItemFromList);

module.exports = router;
