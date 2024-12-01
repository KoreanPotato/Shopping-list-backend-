const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user_route')
const listRoutes = require('./routes/list_route')


app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', listRoutes)

const db = 'mongodb+srv://Unicorn:482564@cluster0.ztujm.mongodb.net/ShoppingList?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});










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