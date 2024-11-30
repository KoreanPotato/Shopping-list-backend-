const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {required: true, unique: true, type: String},
    password: {required: true, type: String},
    email: {required: true, type: String},
    shoppingListsOwner: [{ type: String, ref: 'ShoppingList' }], 
    shoppingListsMember: [{ type: String, ref: 'ShoppingList' }]

})


const User = mongoose.model('User', userSchema);
module.exports = User;