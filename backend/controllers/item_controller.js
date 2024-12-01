const Item = require('../schemas/item_schema'); 
const List = require('../schemas/list_schema'); 

const addItemToList = async (req, res) => {
    const { listId } = req.params; 
    const { name, resolved } = req.body; 

    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }

        const newItem = new Item({
            name,
            resolved,
            list: listId, 
        });

        const savedItem = await newItem.save();

        list.items = list.items || []; 
        list.items.push(savedItem._id);
        await list.save();

        res.status(201).json({ message: 'Item added to the list', item: savedItem });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const removeItemFromList = async (req, res) => {
    const { itemId } = req.params; 

    try {
        const deletedItem = await Item.findByIdAndDelete(itemId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const list = await List.findById(deletedItem.list);
        if (list) {
            list.items = list.items.filter(id => id.toString() !== itemId);
            await list.save();
        }

        res.status(200).json({ message: `Item "${deletedItem.name}" was removed from the list` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const getAllItemsForList = async (req, res) => {
    const { listId } = req.params; 
    try {
        const list = await List.findById(listId);
        if (!list) {
            return res.status(404).json({ message: 'List not found' });
        }
        const items = await Item.find({ list: listId });
        res.status(200).json({
            message: `Items for list: ${list.name}`,
            items
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    addItemToList,
    removeItemFromList,
    getAllItemsForList
}

