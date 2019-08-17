import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';
chai.use(chaiHttp);
chai.should();

//test to get all requests for admin
describe.skip('GET allRequests for admin', () => {
    it('should return all requests', (done) => {
        chai.request(app)
        .get('/api/v1/requests/')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
        })
    })
})

//test for all put endpoints for admin
describe.skip('All PUT endpoint', () => {
    //test to approve a request
    describe('PUT approve a request', () => {
        it('should approve a request when called', (done) => {
            const id = 1;
            chai.request(app)
            .put(`/api/v1/requests/${id}/approve`)
            .end((err, res) => {
                res.should.have.status(401);

                // res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            })
        })
    })

    //test to disapprove a request
    describe('PUT disapprove a request', () => {
        it('should disapprove a request when called', (done) => {
            const id = 2;
            chai.request(app)
            .put(`/api/v1/requests/${id}/disapprove`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            })
        })
    })

    //test to resolve a request
    describe('PUT resolve a request', () => {
        it('should resolve a request when called', (done) => {
            const id = 3;
            chai.request(app)
            .put(`/api/v1/requests/${id}/resolve`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                done();
            })
        })
    })
})