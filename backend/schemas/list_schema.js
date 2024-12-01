const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }], 
    owner: { type: String, required: true, ref: 'User' },
    members: [{ type: String, ref: 'User' }]
});

const List = mongoose.model('List', listSchema);
module.exports = List;