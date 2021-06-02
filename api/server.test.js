const supertest = require('supertest');
const server = require('./server');


describe('server', ()=>{
  describe('Is the API running?', ()=>{
    it('returns status 200', () =>{
      return supertest(server)
        .get('/')
        .then(res=>{
          expect(res.status).toBe(200);
        });
    })
  });
});