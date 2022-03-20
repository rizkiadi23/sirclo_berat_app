const chai = require('chai');
const weightController = require('../../../src/controllers/weightController');
const sinon = require('sinon');
const Weight = require('../../../src/models/weightModel');

describe('Unit Test: weightController.js', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('getWeights function', () => {
    const req = { query: { range: '[0,9]' } };

    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const successResponse = [
      {
        id: '1234',
        date: '2022-12-12',
        minimum: 60,
        maximum: 61,
        differences: 1,
      },
      {
        id: '1235',
        date: '2022-11-12',
        minimum: 59,
        maximum: 63,
        differences: 4,
      },
    ];

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(200);
      res.json = sinon.stub().returns(successResponse);
      return res;
    };

    it('Should return success when the aggregation and countDocuments is success', async () => {
      sandbox.stub(Weight, 'find').resolves(successResponse);
      sandbox.stub(Weight, 'countDocuments').resolves(2);
      const result = await weightController.getWeights(
        req,
        mockSuccessResponse
      );
      chai.expect(result.status()).to.eql(200);
      chai.expect(result.json().length).to.eql(2);
    });
  });

  describe('getWeight function', () => {
    const req = { params: { id: '1234' } };

    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(200);
      res.json = sinon.stub().returns(successResponse);
      return res;
    };

    const successResponse = {
      date: '2022-12-12',
      minimum: 60,
      maximum: 61,
      differences: 1,
    };

    it('Should throw an error if the record is not found', async () => {
      sandbox.stub(Weight, 'findById').resolves(null);
      try {
        await weightController.getWeight(req, failedResponse);
      } catch (e) {
        chai.expect(e.message).to.equal('Weight 1234 not found');
      }
    });

    it('Should return success when the record is found', async () => {
      sandbox.stub(Weight, 'findById').resolves(successResponse);
      const result = await weightController.getWeight(req, mockSuccessResponse);
      chai.expect(result.status()).to.eql(200);
    });
  });

  describe('getWeightStats function', () => {
    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const successResponse = [
      {
        id: '1234',
        avgMinimum: 64.12,
        avgMaximum: 67.11,
        avgDifferences: 1.22,
      },
    ];

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(200);
      res.json = sinon.stub().returns(successResponse);
      return res;
    };

    const req = { params: { id: '1234' } };

    it('Should throw an error if the aggregation is failing', async () => {
      sandbox.stub(Weight, 'aggregate').resolves(null);
      try {
        await weightController.getWeightStats(req, failedResponse);
      } catch (e) {
        chai.expect(e.message).to.equal('Weight 1234 not found');
      }
    });

    it('Should return success when the weight stats can be aggregated', async () => {
      sandbox.stub(Weight, 'aggregate').resolves(successResponse);
      const result = await weightController.getWeightStats(
        req,
        mockSuccessResponse
      );
      chai.expect(result.status()).to.eql(200);
    });
  });

  describe('createWeight function', () => {
    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const successResponse = [
      {
        date: '2022-01-01',
        minimum: 60,
        maximum: 90,
        differences: 30,
      },
    ];

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(201);
      res.json = sinon.stub().returns(successResponse);
      return res;
    };

    const req = {
      body: {
        date: '2022-01-01',
        minimum: 60,
        maximum: 90,
        differences: 30,
      },
    };

    it('Should return success when the weight record creation is succeed', async () => {
      sandbox.stub(weightController, 'validateWriteAction').resolves({});
      sandbox.stub(Weight, 'create').resolves(successResponse);
      const result = await weightController.createWeight(
        req,
        mockSuccessResponse
      );
      chai.expect(result.status()).to.eql(201);
    });

    it('Should failing create new weight record when the minimum key is greater than maximum key', async () => {
      const invalidReq = {
        body: { minimum: 100, maximum: 99, date: '2022-01-01' },
        params: { id: '1234' },
      };
      try {
        await weightController.createWeight(invalidReq, failedResponse);
      } catch (e) {
        chai
          .expect(e.message)
          .to.equal(
            'Bad request - minimum shouldnt be greater than maximum value'
          );
      }
    });
  });

  describe('updateWeight function', () => {
    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const successUpdatedData = {
      id: '1234',
      date: '2022-02-01',
      minimum: 61,
      maximum: 91,
      differences: 30,
    };

    const existingData = {
      id: '1234',
      date: '2022-01-01',
      minimum: 60,
      maximum: 90,
      differences: 30,
    };

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(200);
      res.json = sinon.stub().returns(successUpdatedData);
      return res;
    };

    const req = { body: successUpdatedData, params: { id: '1234' } };

    it('Should return success when the weight record update is succeed', async () => {
      sandbox.stub(Weight, 'findById').resolves(existingData);
      sandbox.stub(weightController, 'validateWriteAction').resolves({});
      sandbox.stub(Weight, 'findByIdAndUpdate').resolves(successUpdatedData);
      const result = await weightController.updateWeight(
        req,
        mockSuccessResponse
      );
      chai.expect(result.status()).to.be.eql(200);
      chai.expect(result.json().minimum).to.be.eql(61);
      chai.expect(result.json().differences).to.be.eql(30);
    });

    it('Should throw an error if the find existing record is failing', async () => {
      sandbox.stub(Weight, 'findById').resolves(null);
      try {
        await weightController.updateWeight(req, failedResponse);
      } catch (e) {
        chai.expect(e.message).to.equal('Weight record not found');
      }
    });

    it('Should throw an error if the find existing record is failing', async () => {
      const invalidReq = { body: { mimimal: 10 }, params: { id: '1234' } };
      sandbox.stub(Weight, 'findById').resolves(existingData);
      try {
        await weightController.updateWeight(invalidReq, failedResponse);
      } catch (e) {
        chai.expect(e.message).to.equal('Required fields missing');
      }
    });
  });

  describe('deleteWeight function', () => {
    const failedResponse = {
      status: function (val) {},
      json: function (val) {},
    };

    const successRemoveData = {
      id: '1234',
      message: 'successfully removes weight: 1234',
    };

    const existingData = {
      id: '1234',
      date: '2022-01-01',
      minimum: 60,
      maximum: 90,
      differences: 30,
      remove: function (val) {},
    };

    const req = { params: { id: '1234' } };

    const mockSuccessResponse = () => {
      const res = {};
      res.status = sinon.stub().returns(204);
      res.json = sinon.stub().returns(successRemoveData);
      return res;
    };

    it('Should return success when the weight record removal is succeed', async () => {
      sandbox.stub(Weight, 'findById').resolves(existingData);
      sandbox.stub(Weight, 'remove').resolves(true);
      const result = await weightController.deleteWeight(
        req,
        mockSuccessResponse
      );
      chai.expect(result.status()).to.be.eql(204);
      chai
        .expect(result.json().message)
        .to.be.eql('successfully removes weight: 1234');
    });

    it('Should failed to be deleted when the weight record is not found', async () => {
      try {
        sandbox.stub(Weight, 'findById').resolves(null);
        const result = await weightController.deleteWeight(req, failedResponse);
      } catch (e) {
        chai.expect(e.message).to.equal('Weight record not found');
      }
    });
  });
});
