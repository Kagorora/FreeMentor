/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('session tests', () => {
  // =================== view all users =====================================

  it('should be able to create session if user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/sessions')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJydWhpbWJhemFiQGdtYWlsLmNvbSIsInVzZXJUeXBlIjoidXNlciIsImlhdCI6MTU2NjI3OTM3N30.1RfaB3SWcapjKSrOyJOFx0PkjcWmR7P1JwmDducUNpw')
      .end((err, res) => {
        res.body.status.should.be.equal(201);
      });
    done();
  });

  it('should not be able to create session if not user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/sessions')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MjgwMzI2fQ.SUJtazyDe7DctuSJscYhGq23mSzm3ePr1EUyS4BuiuE')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.equal('Only users can create mentorShip session');
      });
    done();
  });

  // =================== accept session ==========================

  it('should able to accept session if mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/sessions/2/accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjM2NTE5Mn0.C5jpalm6tuLDc2y2lFdcrNGq5htu8Tjs6QIUrHfv7I0')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('session accepted');
      });
    done();
  });

  it('should not able to accept session if not mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/sessions/1/accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MzY2OTEzfQ.bipnLV62xjVSqxvyXXNO9aW4X7lheR6RPkJQ3LWjZpM')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('Unauthorized access');
      });
    done();
  });

  it('should not able to accept session if session is not due to that mentor', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/sessions/3/accept')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhbGluZUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjM2NzEwNH0.g3LZne6lyk_hs9BkIwK2xqh7n_sGDM2ilNMyhDDSsxA')
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('Unauthorized operation');
      });
    done();
  });
});
