const weightRouter = require('../../../src/routes/weightRoutes');
const chai = require('chai');

describe('Unit Test: weightRouter.js', () => {
  describe('Weight Router', () => {
    it('Should contains create, read, update & delete Endpoints - total 6 endpoints', () => {
      const routes = [
        {
          path: '/',
          method: 'get',
        },
        {
          path: '/statistics',
          method: 'get',
        },
        {
          path: '/:id',
          method: 'get',
        },
        {
          path: '/',
          method: 'post',
        },
        {
          path: '/:id',
          method: 'put',
        },
        {
          path: '/:id',
          method: 'delete',
        },
      ];
      let matchRoutes = 0;
      routes.forEach((route) => {
        const match = weightRouter.stack.find(
          (s) => s.route.path === route.path && s.route.methods[route.method]
        );
        if (match) matchRoutes++;
      });
      chai.expect(matchRoutes).to.be.eql(routes.length);
    });
  });
});
