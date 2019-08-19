import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../index';

chai.use(chaiHttp);
chai.should();

let token = null;

describe('POST signup', () => {
  it('signup a new user', (done) => {
    const newUser = {
      username: "username",
      password: "password"
    }

    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done()
      })
  })
})

describe('POST /auth/login', () => {
  it('it should log in a user', ((done) => {
    const user = {
      username: "mohammc",
      password: "mohanuhu"
    };
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
        done(err);
      });
  }));
})


export default token;