'use strict';

const jwt = require('jsonwebtoken');
const { server } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');

const mockRequest = supergoose(server);

describe('Auth Router', () => {
  describe('users signup/in', () => {
    it('can sign up', async () => {
      const userData = { username: 'khaled', password: '1234' };
      const results = await mockRequest.post('/signup').send(userData);
      let user = results.body;
      expect(userData[name]).toEqual(user[name]);
    });

    it('can signin with basic', async () => {
      const userData = { username: 'waleed', password: '1234' };
      await mockRequest.post('/signup').send(userData);
      const results = await mockRequest.post('/signin').auth('waleed', '1234');
      const token = jwt.verify(results.body.token, process.env.SECRET);
      expect(token).toBeDefined();
    });
  });

  it('should respond with 404 for not found routes', () => {
    return mockRequest
      .get('/users/notFound')
      .then((result) => {
        expect(result.status).toBe(404);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  it('should respond with 500 for bad routes', () => {
    return mockRequest
      .get('/bad')
      .then((result) => {
        expect(result.status).toBe(500);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});