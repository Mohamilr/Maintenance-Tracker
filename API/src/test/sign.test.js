import chai from 'chai';
import chaiHttp from 'chai-http';

// jwt
import jwt from 'jsonwebtoken';

// bcrypt
import bcrypt from 'bcrypt';

import app from '../index';

chai.use(chaiHttp);
chai.should();

// describe('POST sidnup')
describe('POST signup', () => {
    it('should give an error', (done) => {
        const newUser = {
            username: "mohammed",
            password:  "123456"
        }

        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(
          newUser.username
        )
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.have.property('message')
            done()
        })
    })
 
    //
    it('should give an error', (done) => {
        chai.request(app)
        .post('/api/v1/auth/signup')
        .end((err, res) => {
            res.should.have.status(400)
            res.body.should.be.a('object')
            done();
        })
    })



    //

    it('should sign up a new user', (done) => {
        const newUser = {
            username: "mohammed",
            password:  "123456"
        }

        const genToken = async () => {
            if(newUser.username && newUser.password){
            await jwt.sign( { newUser } , 'secretkey', (err, token) => {
                if(err){console.log(err)}
                console.log(token)
                return token;
            })
        }
        }
        

        chai.request(app)
        .post('/api/v1/auth/signup')
        .send(newUser, genToken)
        .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            done(err);
        })
        
    })
})

describe.skip('POST login', () => {
    it('should login a new user', (done) => {
        const newUser = {
            username: "mohammed",
            password:  "123456"
        }

        const genToken = jwt.sign( { newUser} , 'secretkey', (err, token) => {
            if(err){console.log(err)}
            console.log(token)
            return token;
        })

        chai.request(app)
        .post('/api/v1/auth/login')
        .send({
            genToken
        })
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object')
            done();
        })
    })
})

