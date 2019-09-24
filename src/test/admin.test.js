import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

// import generated token from sign-up.test.js
import token2 from './sign-up.test';

chai.use(chaiHttp);
chai.should();

//test to get all requests for admin
describe('GET allRequests for admin', () => {
    // give an error
    describe('GET allRequests for admin', () => {
        it('should return all requests', (done) => {
            chai.request(app)
            .get('/api/v1/requests/')
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
              res.should.have.status(401);
            })
            done();
        })
    })

    // get all requests for admin
    describe('GET allRequests for admin', () => {
        it('should return all requests', (done) => {
            chai.request(app)
            .get('/api/v1/requests/')
            .set('Authorization', `bearer ${token2}`)
            .end((err, res) => {
              res.should.have.status(200);
            })
            done();
        })
    })
})


//test for all put endpoints for admin
describe('All PUT endpoint', () => {
    // give an error
    describe('PUT approve a request', () => {
        it('should approve a request when called', (done) => {
            const id = 12;
            chai.request(app)
            .put(`/api/v1/requests/${id}/approve`)
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(401);
            })
            done();
        })
    })
     
    //test to approve a request
    describe('PUT approve a request', () => {
        it('should approve a request when called', (done) => {
            const id = 12;
            chai.request(app)
            .put(`/api/v1/requests/${id}/approve`)
            .set('Authorization', `bearer ${token2}`)
            .end((err, res) => {
                res.should.have.status(200);
            })
            done();
        })
    })


    // give an error
    describe('PUT disapprove a request', () => {
        it('should disapprove a request when called', (done) => {
            const id = 2;
            chai.request(app)
            .put(`/api/v1/requests/${id}/disapprove`)
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(401);
            })
            done();
        })
    })
    
    //test to disapprove a request
    describe('PUT disapprove a request', () => {
        it('should disapprove a request when called', (done) => {
            const id = 2;
            chai.request(app)
            .put(`/api/v1/requests/${id}/disapprove`)
            .set('Authorization', `bearer ${token2}`)
            .end((err, res) => {
                res.should.have.status(200);
            })
            done();
        })
    })



    // give an error
    describe('PUT resolve a request', () => {
        it('should resolve a request when called', (done) => {
            const id = 3;
            chai.request(app)
            .put(`/api/v1/requests/${id}/resolve`)
            .set('Authorization', `bearer wrong token`)
            .end((err, res) => {
                res.should.have.status(401);
            })
            done();
        })
    })

    //test to resolve a request
    describe('PUT resolve a request', () => {
        it('should resolve a request when called', (done) => {
            const id = 3;
            chai.request(app)
            .put(`/api/v1/requests/${id}/resolve`)
            .set('Authorization', `bearer ${token2}`)
            .end((err, res) => {
                res.should.have.status(200);
            })
            done();
        })
    })

})