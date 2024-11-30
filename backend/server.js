const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user_route')


app.use(express.json());
app.use('/api', userRoutes)

const db = 'mongodb+srv://Unicorn:482564@cluster0.ztujm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// //reading data
// const readData = () => {
//   try {
//     const data = fs.readFileSync(DATA_FILE, 'utf8');
//     return JSON.parse(data || '{}');
//   } catch (err) {
//     return { users: [], lists: [], items: [] };
//   }
// };

// // write dada
// const writeData = (data) => {
//   fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
// };


// // create new list
// app.post('/lists', (req, res) => {
//   const { name, ownerId } = req.body;
//   const data = readData();
//   const owner = data.users.find((user) => user._id === ownerId);

//   if (!owner) {
//     return res.status(404).json({ error: 'Owner not found' });
//   }

//   const newList = {
//     _id: Date.now().toString(),
//     name,
//     owner: ownerId,
//     members: [],
//     items: [],
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   };

//   data.lists.push(newList);
//   owner.shoppingListsOwner.push(newList._id);
//   writeData(data);

//   res.status(201).json(newList);
// });

// // delete item from the list
// app.delete('/lists/:listId/items/:itemId', (req, res) => {
//     const { listId, itemId } = req.params;
//     const data = readData();
  
//     const list = data.lists.find((list) => list._id === listId);
//     if (!list) {
//       return res.status(404).json({ error: 'List not found' });
//     }
  
//     const itemIndex = list.items.findIndex((item) => item._id === itemId);
//     if (itemIndex === -1) {
//       return res.status(404).json({ error: 'Item not found in the list' });
//     }
  
//     list.items.splice(itemIndex, 1);
//     data.items = data.items.filter((item) => item._id !== itemId);
//     writeData(data);
  
//     res.json({ message: 'Item deleted successfully' });
//   });
  

// // add member to the list
// app.post('/lists/:listId/members', (req, res) => {
//   const { userId } = req.body;
//   const data = readData();
//   const list = data.lists.find((list) => list._id === req.params.listId);
//   const user = data.users.find((user) => user._id === userId);

//   if (!list || !user) {
//     return res.status(404).json({ error: 'List or user not found' });
//   }

//   if (!list.members.includes(userId)) {
//     list.members.push(userId);
//     user.shoppingListsMember.push(list._id);
//     writeData(data);
//     res.json({ message: 'User added to list' });
//   } else {
//     res.status(400).json({ error: 'User already a member' });
//   }
// });

// // delete list
// app.delete('/lists/:listId', (req, res) => {
//     const data = readData();
//     const listId = req.params.listId;
//     const listIndex = data.lists.findIndex((list) => list._id === listId);
  
//     if (listIndex === -1) {
//       return res.status(404).json({ error: 'List not found' });
//     }
  
//     const list = data.lists[listIndex];
  
//     data.lists.splice(listIndex, 1);
  
//     data.items = data.items.filter((item) => item.shoppingList !== listId);
  
//     const ownerUser = data.users.find((user) => user._id === list.owner);
//     if (ownerUser) {
//       ownerUser.shoppingListsOwner = ownerUser.shoppingListsOwner.filter((id) => id !== listId);
//     }
  
//     list.members.forEach((memberId) => {
//       const memberUser = data.users.find((user) => user._id === memberId);
//       if (memberUser) {
//         memberUser.shoppingListsMember = memberUser.shoppingListsMember.filter((id) => id !== listId);
//       }
//     });
  
//     writeData(data);
//     res.json({ message: 'List deleted successfully' });
//   });

// // add item to the list
// app.post('/lists/:listId/items', (req, res) => {
//   const { name } = req.body;
//   const data = readData();
//   const list = data.lists.find((list) => list._id === req.params.listId);

//   if (!list) {
//     return res.status(404).json({ error: 'List not found' });
//   }

//   const newItem = {
//     _id: Date.now().toString(),
//     name,
//     resolved: false,
//     shoppingList: list._id,
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   };

//   list.items.push(newItem);
//   data.items.push(newItem);
//   writeData(data);

//   res.status(201).json(newItem);
// });

// // filtering itrms
// app.get('/lists/:listId/items', (req, res) => {
//   const { filter } = req.query; 
//   const data = readData();
//   const list = data.lists.find((list) => list._id === req.params.listId);

//   if (!list) {
//     return res.status(404).json({ error: 'List not found' });
//   }

//   let items = list.items;

//   if (filter === 'resolved') {
//     items = items.filter((item) => item.resolved === true);
//   } else if (filter === 'unresolved') {
//     items = items.filter((item) => item.resolved === false);
//   }

//   res.json(items);
// });

// // delete member from the list
// app.delete('/lists/:listId/members/:userId', (req, res) => {
//   const data = readData();
//   const list = data.lists.find((list) => list._id === req.params.listId);
//   const user = data.users.find((user) => user._id === req.params.userId);

//   if (!list || !user) {
//     return res.status(404).json({ error: 'List or user not found' });
//   }

//   list.members = list.members.filter((memberId) => memberId !== req.params.userId);
//   user.shoppingListsMember = user.shoppingListsMember.filter(
//     (listId) => listId !== req.params.listId
//   );

//   writeData(data);
//   res.json({ message: 'User removed from list' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });