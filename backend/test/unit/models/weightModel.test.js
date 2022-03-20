const Weight = require('../../../src/models/weightModel');
const chai = require('chai');

describe('Unit Test: weightModel.js', () => {
  describe('Weight Model', () => {
    it('Should has date, minimum, maximum mandatory fields', () => {
      let expectedProperties = ['date', 'minimum', 'maximum', 'differences'];
      let keys = Object.keys(Weight.schema.obj);
      chai.expect(keys).to.be.eql(expectedProperties);
    });

    it('Should activate virtual property in the _id', () => {
      const virtualInId = Weight.schema.virtuals.id.path;
      chai.expect(virtualInId).to.be.eql('id');
    });
  });
});
