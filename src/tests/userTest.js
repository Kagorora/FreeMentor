/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('User tests', () => {
  // ========================================== SIGNUP ==========================
  // eslint-disable-next-line no-undef
  it('should be able to signup', (done) => {
    const user = {
      id: 1,
      firstName: 'ruhimbaza',
      lastName: 'Bertin',
      email: 'ndanda@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.should.be.an('object');
      });
    done();
  });
  it('should not be able to signup for duplicate', (done) => {
    const user = {
      id: 1,
      firstName: 'ruhimbaza',
      lastName: 'Bertin',
      email: 'ruhimbazab@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
      });
    done();
  });
  it('should not be able to signup for missing information', (done) => {
    const user = {
      lastName: 'Bertin',
      email: 'tkyz@gmail.com',
      password: 'bertin123',
      address: 'kigali',
      bio: 'scientist',
      occupation: 'software development',
      expertise: 'sostware architecture',
      userType: 'user',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.should.be.an('object');
      });
    done();
  });
  // ======================== sign in ===============
  it('should be able to signin', (done) => {
    const user = {
      email: 'manziJamesb@gmail.com',
      password: 'Niyonkuru@1',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.should.be.an('object');
        res.body.message.should.be.equal('User is successfully logged in');
      });
    done();
  });

  it('should not be able to signin when not signed up', (done) => {
    const user = {
      email: 'a@gmail.com',
      password: 'bertin123',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('user not found');
      });
    done();
  });

  it('should not be able to signin when passwords are not matching', (done) => {
    const user = {
      email: 'ruhimbazab@gmail.com',
      password: 'trash',
    };
    chai.request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.should.be.an('object');
        res.body.error.should.be.equal('password not matching');
      });
    done();
  });
});
