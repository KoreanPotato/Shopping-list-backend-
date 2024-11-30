const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    resolved: {type: Boolean, required: true},
    list: { type: String, ref: 'List' },         
    
})

const Item = mongoose.model('List', itemSchema);
module.exports = Item;