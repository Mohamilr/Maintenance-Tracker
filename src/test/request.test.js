import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

// import generated token from sign.test.js
import token from './sign-in.test';

chai.use(chaiHttp);
chai.should();

//test to get all requests 
describe('test to get all requests', () => {
  // give an error
  describe('GET allRequests', () => {
    it("should give an error",  (done) => {
      const id = 79;
      chai.request(app)
          .get(`/api/v1/users/requests/${id}/all`) 
          .set('Authorization', `bearer wrong token`)
          .end ((err, res) => {
          res.should.have.status(401);
        });
        done();
    });
  });

  // test to get all request for a loged in user
  describe('GET allRequests', () => {
    it("should get all requests for a loged in user",  (done) => {
      const id = 79;
      chai.request(app)
          .get(`/api/v1/users/requests/${id}/all`) 
          .set('Authorization', `bearer ${token}`)
          .end ((err, res) => {
          res.should.have.status(200);
        });
        done();
    });
  });

})
  

//test to get a single request
describe('GET a single request', () => {
  // give an error
  describe('GET allRequests', () => {
    it("should give an error",  (done) => {
      const id = 79;
      chai.request(app)
          .get(`/api/v1/users/requests/${id}`) 
          .set('Authorization', `bearer wrong token`)
          .end ((err, res) => {
          res.should.have.status(401);
        });
        done();
    });
  });
  
  // test to get all request for a loged in user
  describe('GET:id getSingleRequest', () => {
    it('should get a single request by id', (done) => {
      const id = 89;
      chai.request(app)
      .get(`/api/v1/users/requests/${id}`)
      .set('Authorization', `bearer ${token}`)
      .end((err, res) => {
        res.should.have.status(200);
      })
      done();
    })
  })

})


//test to add a request
describe('POST addrequest', () => {
  // give an error
  describe('POST addRequest', () => {
    it('should add a request', (done) => {
      chai.request(app)
      .post(`/api/v1/users/requests`)
      .set('Authorization', `bearer wrong token`)
      .send({
        faulty_item: 'laptop',
        item_type: 'dell',
        complaint: 'the mother board',
        userId: 79
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
      })
      done();
    })
  })

  // post a request
  describe('POST addRequest', () => {
    it('should add a request', (done) => {
      chai.request(app)
      .post(`/api/v1/users/requests`)
      .set('Authorization', `bearer ${token}`)
      .send({
        faulty_item: 'laptop',
        item_type: 'dell',
        complaint: 'the mother board',
        userId: 79
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
      })
      done();
    })
  })

})


//test to modify a request
describe('PUT modifyARequest', () => {
  // give an error
  describe('PUT modifyARequest', () => {
    it('should modify a request', (done) => {
      const id = 88;
      chai.request(app)
      .put(`/api/v1/users/requests/${id}`)
      .set('Authorization', `bearer wrong token`)
      .send({
        faulty_item: 'laptop',
        item_type: 'dell',
        complaint: 'the mother board',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
      })
      done();
    })
  })

  // modify a request
  describe('PUT modifyARequest', () => {
    it('should modify a request', (done) => {
      const id = 88;
      chai.request(app)
      .put(`/api/v1/users/requests/${id}`)
      .set('Authorization', `bearer ${token}`)
      .send({
        faulty_item: 'laptop',
        item_type: 'dell',
        complaint: 'the mother board',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
      })
      done();
    })
  })

})