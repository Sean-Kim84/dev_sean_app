const request = require('supertest');
const app = require('../app');

test('Should singup a user', async () => {
  await request(app).post('/api/users').send({
    name: "seankim843",
    email: "sean.kim1234@gmail.com",
    password: 'aaa123456'
  }).expect(201);
})