'use strict';

const supergoose = require('@code-fellows/supergoose');
const { server } = require('../src/server');
const mockRequest = supergoose(server);

describe('Server API', ()=> {
  it('should respond with 500', ()=> {
    return mockRequest.get('/bad')
      .then(results=> {
        expect(results.status).toBe(500);
      }).catch(console.error);
  });

  it('should respond 404 of an invalid route',() => {
    return mockRequest
      .get('/invalidroute')
      .then(results => {
        expect(results.status).toBe(404);
      }).catch(console.log);
  });

  it('should respond properly /users', ()=> {
    return mockRequest
      .get('/users')
      .then(results => {
        expect(results.status).toBe(200);
      });
  });

  it('TEST post() /list ', ()=> {
    let obj = {name: 'test-post-1'};
    return mockRequest
      .post('/list')
      .send(obj)
      .then(data => {
        expect(data.status).toBe(404);
      });
  });

  it('TEST post() not found ', ()=> {
    return mockRequest
      .post('/notFound')
      .then(data => {
        // compare what the post has returned with hwat we submitted
        // console.log(data.body);
        expect(data.status).toBe(404);
      });
  });
});
