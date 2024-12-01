const User = require('../schemas/user_schema');
const List = require('../schemas/list_schema');


const getAllLists = async (req, res) => {
    try{
        const allLists = await List.find()
        res.status(201).json(allLists)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })    }
}

const getList = async (req, res) => {
    const {id} = req.params
    try{
        const requiredList = await List.findById(id)
        res.status(201).json(requiredList)
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })    }
}

const createList = async (req, res) => {
    const {name} = req.body
    const {id} = req.params
    try {
        const list = new List ({name, owner: id});

        const savedList = await list.save();
        res.status(201).json({ message: `List ${name} was created`})
    } catch (error) {
        res.error.json({message: err.message})
    }
}

const deleteList = async (req, res) => {
    const { id, userId } = req.params; 
    try {
        const list = await List.findById(id);
        if (!list) {
            return res.status(404).json({ message: 'List not found' }); 
        }

        if (list.owner.toString() !== userId) {
            return res.status(403).json({ message: 'You are not authorized to delete this list' });
        }

        await list.deleteOne(); 
        res.status(200).json({ message: `List "${list.name}" was deleted` });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Internal Server Error' }); 
    }
};


const addMemberToList = async (req, res) => {
    const { listId, userId } = req.params; 
    try {
        const updatedList = await List.findByIdAndUpdate(
            listId,
            { $addToSet: { members: userId } }, 
            { new: true } 
        );

        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.status(200).json({ message: `User ${userId} was added to the list`, list: updatedList });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const removeMemberFromList = async (req, res) => {
    const { listId, userId } = req.params; 

    try {
        const updatedList = await List.findByIdAndUpdate(
            listId,
            { $pull: { members: userId } },
            { new: true } 
        );

        if (!updatedList) {
            return res.status(404).json({ message: 'List not found' });
        }

        res.status(200).json({ message: `User ${userId} was removed from the list`, list: updatedList });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = { 
    createList, 
    deleteList, 
    getAllLists, 
    getList,
    addMemberToList, 
    removeMemberFromList 
}