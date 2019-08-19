/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';

chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('Admin tests', () => {
  // =================== view all users =====================================

  it('should be able to view all users if admin', (done) => {
    chai.request(server)
      .get('/api/v1/auth/allUsers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MjMxODExfQ.xqcTM2MjoCpOPrn92-z37rv6YrATVi5QJTWPZ9nezJk')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        // res.body.message.should.be.equal('Forbirden route');
      });
    done();
  });

  it('should not be able to view all users if not admin', (done) => {
    chai.request(server)
      .get('/api/v1/auth/allUsers')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYW56aUphbWVzYkBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjIzMjUyMH0.DMkjrgNQExohIfCFohUfoQ6KDvYoENxvRn-_8gBbZt8')
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        // res.body.message.should.be.equal('Forbirden route');
      });
    done();
  });

  it('should not be able to view all users if token is wrong', (done) => {
    chai.request(server)
      .get('/api/v1/auth/allUsers')
      .set('token', 'ccc')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('Authentication failed');
      });
    done();
  });

  // =================== update user to mentor =====================================

  it('should be able to update user to mentor if admin', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/user/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MjQyMDAyfQ.UwOG5mln-hELDCoKOQwLkgYTzGG7rq2LsYG4YTOIf4U')
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('User account changed to mentor');
      });
    done();
  });

  it('should not be able to update user to mentor if not admin', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/user/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtYW56aUphbWVzYkBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6Im1lbnRvciIsImlhdCI6MTU2NjI0MjYwM30.dL--7lguhjjVr5DiAkJ7cfk_J9pifV3L1k5_qscfhD4')
      .end((err, res) => {
        res.body.status.should.be.equal(404);
        res.body.error.should.be.equal('Forbirden route');
      });
    done();
  });

  it('should not be able to update user to mentor if already mentor or admin', (done) => {
    chai.request(server)
      .patch('/api/v1/auth/user/1')
      .set('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJrYWdvcm9yYUBnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluIiwiaWF0IjoxNTY2MjQyMDAyfQ.UwOG5mln-hELDCoKOQwLkgYTzGG7rq2LsYG4YTOIf4U')
      .end((err, res) => {
        res.body.status.should.be.equal(400);
        res.body.error.should.be.equal('user is already a mentor or admin');
      });
    done();
  });
});
