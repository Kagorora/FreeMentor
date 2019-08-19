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

  // ==================== view all mentors =============================
  it('should be able to view all users if admin or user', (done) => {
    chai.request(server)
      .get('/api/v1/auth/mentors')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MjQ1ODY0fQ.vJDcbSko9kqIxWskhk9hfoWhlMQbVGOjlyN9KqQ8M30')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to view all users if not admin or user', (done) => {
    chai.request(server)
      .get('/api/v1/auth/mentors')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjI0NjY0OX0.fv6O7PrVOuZ3O72UbJHMoFGAxWn_PZm1-j3nL7F5Ksc')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('unauthorised route');
      });
    done();
  });

  // ======================== search a speific mentor ===========================
  it('should able to view one mentor if logged in as user or admin', (done) => {
    chai.request(server)
      .get('/api/v1/auth/mentors/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJydWhpbWJhemFiQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjI0ODU2NX0.29q3IikOt7vrjSAeHprB22czPDF7cfMR4mXyMSYnKvo')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
      });
    done();
  });

  it('should not be able to view one mentor if logged in as mentor', (done) => {
    chai.request(server)
      .get('/api/v1/auth/mentors/2')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjI0OTAxMn0.i216Mah33X2ILoFdV0LMI1uWJKNGNsHvUQN4FH4eYOI')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('only admin and user have access');
      });
    done();
  });

  it('should not able to view one mentor if not found', (done) => {
    chai.request(server)
      .get('/api/v1/auth/mentors/100')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJydWhpbWJhemFiQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjI0ODU2NX0.29q3IikOt7vrjSAeHprB22czPDF7cfMR4mXyMSYnKvo')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('mentor not found');
      });
    done();
  });
});
