const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server'); // Подключаем сервер
const List = require('../schemas/list_schema');

jest.setTimeout(30000); // Устанавливаем таймаут для тестов

beforeAll(async () => {
  // Подключаемся к тестовой базе данных
  const db = 'mongodb://localhost:27017/testdb';
  await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  // Закрываем подключение после тестов
  await mongoose.connection.close();
});

beforeEach(async () => {
  // Очищаем коллекцию перед каждым тестом
  await List.deleteMany({});
});

describe('Shopping List API Tests', () => {
  test('GET /api/shoppingList/list - получение всех записей', async () => {
    const response = await request(app).get('/api/shoppingList/list');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  test('POST /api/shoppingList/create - создание записи', async () => {
    const newItem = { name: 'Молоко', quantity: 2 };
    const response = await request(app)
      .post('/api/shoppingList/create')
      .send(newItem);
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('name', 'Молоко');
  });
});
