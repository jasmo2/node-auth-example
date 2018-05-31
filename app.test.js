const request = require('supertest');
process.env.DATABASE_URL = "mongodb://localhost/auth-test-test";
const mongoose = require("mongoose");
const app = require('./app');
const User = require("./user");

beforeEach(async () => {
  await User.remove({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

test('GET / responds with success code', async () => {
  const response = await request(app).get('/');
  expect(response.statusCode).toBe(302);
});

test('POST /register redirects to login', async () => {
  const response = await request(app).post('/register')
          .send("username=user1&password=test1234");
  expect(response.statusCode).toBe(302);
});

test('POST /login redirects to home', async () => {
  await User.create({ username: "user1", password: "test1234" });
  const response = await request(app).post('/login')
          .send("username=user1&password=test1234");
  expect(response.statusCode).toBe(302);
});
