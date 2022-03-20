const chai = require('chai');
const sinon = require('sinon');
const errorMiddleware = require('../../../src/middlewares/errorMiddleware');

describe('Unit Test: errorMiddleware.js', () => {
  const error = {
    message: 'Bad Request',
    stack: null,
  };

  const res = {
    statusCode: 400,
    status: function (val) {},
    json: function (val) {},
  };

  const resWithoutStatusCode = {
    status: sinon.stub().returns(500),
    json: function (val) {},
  };

  it('Should be able to handle error', () => {
    errorMiddleware.errorHandler(error, {}, res, {});
    chai.expect(res.statusCode).to.eql(400);
  });

  it('Should be able to handle error with default code 500', () => {
    errorMiddleware.errorHandler(error, {}, resWithoutStatusCode, {});
    chai.expect(resWithoutStatusCode.status()).to.eql(500);
  });
});
