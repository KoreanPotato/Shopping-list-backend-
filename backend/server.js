const express = require('express');
const mongoose = require('mongoose');
const app = express();
const userRoutes = require('./routes/user_route')
const listRoutes = require('./routes/list_route')
const itemRoutes = require('./routes/item_route')


app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', listRoutes);
app.use('/api', itemRoutes)


const db = 'mongodb+srv://Unicorn:482564@cluster0.ztujm.mongodb.net/ShoppingList?retryWrites=true&w=majority&appName=Cluster0';

mongoose
    .connect(db)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});