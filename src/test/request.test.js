import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

// import generated token from sign.test.js
import token from './sign.test';

chai.use(chaiHttp);
chai.should();

//test to get all requests 
  describe.skip('GET allRequests', () => {
    it("should get all requests for a loged in user",  (done) => {
      chai.request(app)
          .get(`/api/v1/users/requests`)
          .set('authorization', token)
          .end ((err, res) => {
          res.should.have.status(401);
          done(err);
        });
    });
  });

//test if the requst with id is present
describe.skip('GET:id getSingleRequest', () => {
    it('should get a single request by id', (done) => {
      const id = 1;
      chai.request(app)
      .get(`/api/v1/users/requests/${id}`)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(401);
        done(err);
      })
    })
  })

//test to add a request
describe.skip('POST addRequest', () => {
  it('should add a request', (done) => {
    chai.request(app)
    .post(`/api/v1/users/requests`)
    .set('authorization', token)
    .send({
      id: 4,
      faultyItem: 'laptop',
      itemType: 'dell',
      complaint: 'the mother board',
      userId: 2
    })
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.a('object');
      done(err)
    })
  })
})

//test to modify a request
describe.skip('PUT modifyARequest', () => {
  it('should modify a request', (done) => {
    const id = 2;
    chai.request(app)
    .put(`/api/v1/users/requests/${id}`)
    .set('authorization', token)
    .send({
      faultyItem: 'laptop',
      itemType: 'dell',
      complaint: 'the mother board',
    })
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.be.a('object');
      done(err)
    })
  })
})
