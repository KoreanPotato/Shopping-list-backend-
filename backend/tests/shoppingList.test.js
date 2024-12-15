const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');
const List = require('../schemas/list_schema'); 
const User = require('../schemas/user_schema')

jest.setTimeout(30000);

let testOwner; 
beforeAll(async () => {
  const dbURI = 'mongodb+srv://Unicorn:482564@cluster0.ztujm.mongodb.net/drivers?retryWrites=true&w=majority';

  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas test database');

    testOwner = new mongoose.Types.ObjectId();
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error.message);
    throw error;
  }
});

beforeEach(async () => {
  await List.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB Atlas');
});

describe('Shopping List API Tests', () => {
  test('GET /api/shoppingLists - get all lists', async () => {
    await List.create({ name: 'Test Item', owner: testOwner });

    const response = await request(app).get('/api/shoppingLists');

    expect(response.statusCode).toBe(201);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty('name', 'Test Item');
  });

  test('POST /api/shoppingList/create/:id - create new list', async () => {
    const testUser = await User.create({
        username: `testuser_${Date.now()}`,
        password: 'securepassword',
        email: 'testuser@example.com',
        shoppingListsOwner: [],
      });
  
    const newListData = { name: 'new list' };
  
    const response = await request(app)
      .post(`/api/shoppingList/create/${testUser._id}`)
      .send(newListData);
  
    expect(response.statusCode).toBe(201);
  
    expect(response.body.message).toBe(`List new list was created`);
  
    expect(response.body.list).toHaveProperty('name', 'new list');
    expect(response.body.list).toHaveProperty('owner', testUser._id.toString());
  
    const updatedUser = await User.findById(testUser._id);
    expect(updatedUser.shoppingListsOwner).toContainEqual(response.body.list._id);
  });

  test('POST /api/shoppingList/create/:id - user not found', async () => {
    const invalidUserId = new mongoose.Types.ObjectId(); 
    const newListData = { name: 'Invalid List' };
  
    const response = await request(app)
      .post(`/api/shoppingList/create/${invalidUserId}`)
      .send(newListData);
  
    expect(response.statusCode).toBe(404); 
    expect(response.body.message).toBe('User not found');
  });
  

test('PATCH /api/shoppingList/update/:id - update list data', async () => {
    const list = await List.create({ name: 'tea', owner: testOwner });
  
    const updatedData = { name: 'coffe' };
  
    const response = await request(app)
      .patch(`/api/shoppingList/update/${list._id}`)
      .send(updatedData);
  
    expect(response.statusCode).toBe(200);
  
    expect(response.body.message).toBe(`List coffe was updated`);
  
    expect(response.body.list).toHaveProperty('name', 'coffe');
  });
  
  test('PATCH /api/shoppingList/update/:id - list not found', async () => {
    const invalidListId = new mongoose.Types.ObjectId();
    const updatedData = { name: 'nonexistent list' };

    const response = await request(app)
      .patch(`/api/shoppingList/update/${invalidListId}`)
      .send(updatedData);

    expect(response.statusCode).toBe(404); 
    expect(response.body.message).toBe('List not found');
  });

test('DELETE /api/shoppingList/delete/:id/:userId - deleting list', async () => {
  const list = await List.create({ name: 'tea', owner: testOwner });
  const response = await request(app).delete(`/api/shoppingList/delete/${list._id}/${testOwner}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.message).toBe(`List "tea" was deleted`);
});

test('DELETE /api/shoppingList/delete/:id/:userId - unauthorized deletion', async () => {
    const anotherUser = new mongoose.Types.ObjectId();
    const list = await List.create({ name: 'Tea', owner: testOwner });

    const response = await request(app).delete(`/api/shoppingList/delete/${list._id}/${anotherUser}`);
    expect(response.statusCode).toBe(403); 
    expect(response.body.message).toBe('You are not authorized to delete this list');
  });

test('GET /api/shoppingList/:id - get one list', async () => {
    const list = await List.create({ name: 'Coffe', owner: testOwner });
    const response = await request(app).get(`/api/shoppingList/${list._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Coffe');
  });

  test('GET /api/shoppingList/:id - list not found', async () => {
    const invalidListId = new mongoose.Types.ObjectId();

    const response = await request(app).get(`/api/shoppingList/${invalidListId}`);
    expect(response.statusCode).toBe(404); 
    expect(response.body.message).toBe('List not found');
  });
});

