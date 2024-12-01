const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    resolved: {type: Boolean, default: false},
    list: { type: String, ref: 'List', required: true },         
    
})

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;