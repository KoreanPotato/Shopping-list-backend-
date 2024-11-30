const mongoose = require('mongoose')

const listSchema = new mongoose.Schema ({
    name: {type: String, required: true},
    items: {type: String, ref:'Item'},
    owner: { type: String, ref: 'User' }, 
    members: [{ type: String, ref: 'User' }]
        
    
})

const List = mongoose.model('List', listSchema);
module.exports = List;