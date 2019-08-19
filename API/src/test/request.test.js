import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

// import generated token from sign.test.js
import token from './sign.test';

chai.use(chaiHttp);
chai.should();

//test to get all requests 
  describe('GET allRequests', () => {
    it("should get all requests for a loged in user", (done) => {
      chai.request(app)
          .get(`/api/v1/users/requests`)
          .set('authorization', token)
          .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

//test if the requst with id is present
describe('GET:id getSingleRequest', () => {
    it('should get a single request by id', (done) => {
      const id = 1;
      chai.request(app)
      .get(`/api/v1/users/requests/${id}`)
      .set('authorization', token)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  })

//test to add a request
describe('POST addRequest', () => {
  it('should add a request', (done) => {
    chai.request(app)
    .post(`/api/v1/users/requests`)
    .send({
      id: 4,
      faultyItem: 'laptop',
      itemType: 'dell',
      // date: new Date(),
      complaint: 'the mother board',
      // status: 'pending',
      userId: 2
    })
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      done()
    })
  })
})

//test to modify a request
describe('PUT modifyARequest', () => {
  it('should modify a request', (done) => {
    const id = 2;
    chai.request(app)
    .put(`/api/v1/users/requests/${id}`)
    .send({
      faultyItem: 'laptop',
      itemType: 'dell',
      complaint: 'the mother board',
    })
    .set('authorization', token)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      done()
    })
  })
})
