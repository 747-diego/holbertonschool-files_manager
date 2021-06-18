import app from '../server';
import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';

chai.use(chaiHttp);
describe('AppController', () => {
  it('GET /status', (getStatus) => {
    chai.request(app)
      .get('/status')
      .end((error, res) => {
        expect(error).to.equal(null);
        getStatus();
      });
  });
});
