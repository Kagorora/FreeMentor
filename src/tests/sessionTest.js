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
});
