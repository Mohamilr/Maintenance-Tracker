import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

//test to get all requests 
describe('GET allRequests', () => {
  it("should get all requests", (done) => {
    chai.request(app)
        .get(`/api/v1/users/requests`)
        .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

//test get by id endpoint
describe('GET request by id', () => {
  //test if the requst with id is present
  describe('GET:id getSingleRequest', () => {
    it('should get a single request by id', (done) => {
      const id = 1;
      chai.request(app)
      .get(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      })
    })
  })

  //test if request with id is not present
  describe('GET:id getSingleRequest', () => {
    it('should give an errror if id is not present', (done) => {
      const id = 4;
      chai.request(app)
      .get(`/api/v1/users/requests/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message');
        done();
      })
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
      date: new Date(),
      complaint: 'the mother board',
      status: 'pending'
    })
    .set('Accept', 'application/json')
    .end((err, res) => {
      res.should.have.status(201);
      res.body.should.be.a('object');
      res.body.request.should.have.property('id');
      res.body.request.should.have.property('faultyItem');
      res.body.request.should.have.property('itemType');
      res.body.request.should.have.property('date');
      res.body.request.should.have.property('complaint');
      res.body.request.should.have.property('status');
      done()
    })
  })
})

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
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('object');
      console.log(res.body)
      done()
    })
  })
})
