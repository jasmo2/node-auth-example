const request = require('supertest');
const createApp = require('./app');
const db = require("./db");

let app;
beforeEach(async () => {
  process.env.DATABASE_URL = "mongodb://localhost/auth-test-test";
  app = await createApp();
  await db.users().remove({});
});

afterEach(async () => {
  await db.disconnect();
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
  await db.users().create({ username: "user1", password: "test1234" });
  const response = await request(app).post('/login')
          .send("username=user1&password=test1234");
  expect(response.statusCode).toBe(302);
});
