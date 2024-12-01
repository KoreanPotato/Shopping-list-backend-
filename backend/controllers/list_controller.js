const User = require('../schemas/user_schema');
const List = require('../schemas/list_schema');


const getAllLists = async (req, res) => {
    try{
        const allLists = await List.find()
        res.status(201).json(allLists)
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
    const { id } = req.params

    try {
        const deletedList = await List.findByIdAndDelete(id)
        if (!deletedList) {
            return res.status(404).json({ message: 'List not found' });
        }
        res.status(201).json({ message:`List ${deletedList.name} was deleted`})
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' })
    }

}

module.exports = { createList, deleteList, getAllLists }