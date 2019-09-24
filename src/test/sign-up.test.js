import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();


let token2 =  null;

describe('POST signup', () => {
  it('signup a new user', (done) => {
    const newUser = {
      username: process.env.ADMIN_USERNAME,
      password: process.env.ADMIN_PASSWORD
    }

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        token2 = res.body.token;
      })
      done();
  })
})

export default token2;
