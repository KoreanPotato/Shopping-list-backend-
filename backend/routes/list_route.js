const express = require('express');
const router = express.Router();
const listController = require('../controllers/list_controller');

router.post('/shoppingList/create/:id', listController.createList);
router.delete('/shoppingList/delete/:id/:userId', listController.deleteList);
router.get('/shoppingLists', listController.getAllLists);
router.get('/shoppingList/:id', listController.getList);
router.put('/list/:listId/addMember/:userId', listController.addMemberToList);
router.delete('/list/:listId/removeMember/:userId', listController.removeMemberFromList);


module.exports = router