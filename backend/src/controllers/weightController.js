const asyncHandler = require('express-async-handler');
const Weight = require('../models/weightModel');

/**
 * @desc    getWeights method list all the weight record in the database
 * @route   GET /api/weights
 * @access  Public
 */
const getWeights = asyncHandler(async (req, res) => {
  let { query } = req;
  let queryDefault = { skip: 0, limit: 100 };

  if (query.range) {
    queryDefault.skip = JSON.parse(query.range)[0];
  }

  const weights = await Weight.find()
    .skip(queryDefault.skip)
    .limit(queryDefault.limit)
    .sort({ date: -1 });

  const countWeights = await Weight.countDocuments();

  res.setHeader(
    'Content-Range',
    `weights ${queryDefault.skip}-${queryDefault.limit}/${countWeights}`
  );
  res.status(200).json(weights);
});

/**
 * @desc    getWeight method returns the detail of weight record
 * @route   GET /api/weights/:id
 * @access  Public
 */
const getWeight = asyncHandler(async (req, res) => {
  const weight = await Weight.findById(req.params.id);
  if (!weight) {
    res.status(404);
    throw new Error(`Weight ${req.params.id} not found`);
  }
  res.status(200).json(weight);
});

/**
 * @desc    getWeightStats method returns the statistics of weight list
 * @route   GET /api/weights/statistics
 * @access  Public
 */
const getWeightStats = asyncHandler(async (req, res) => {
  const weight = await Weight.aggregate([
    {
      $group: {
        _id: '$id',
        avgMinimum: { $avg: '$minimum' },
        avgMaximum: { $avg: '$maximum' },
        avgDifferences: { $avg: '$differences' },
      },
    },
  ]);
  if (!weight) {
    res.status(404);
    throw new Error(`Weight ${req.params.id} not found`);
  }
  res.status(200).json([{ ...weight[0], id: Math.random().toFixed(0) }][0]);
});

/**
 * @desc    createWeight method persists new record into the database
 * @route   POST /api/weights
 * @access  Public
 */
const createWeight = asyncHandler(async (req, res) => {
  await validateWriteAction(req, res);

  const weight = await Weight.create({
    date: req.body.date,
    minimum: req.body.minimum,
    maximum: req.body.maximum,
    differences: Number(req.body.maximum - req.body.minimum).toFixed(2),
  });
  res.status(201).json(weight);
});

/**
 * @desc    updateWeight method allows access to edit the existing record
 * @route   PUT /api/weights/:id
 * @access  Public
 */
const updateWeight = asyncHandler(async (req, res) => {
  const weight = await Weight.findById(req.params.id);
  if (!weight) {
    res.status(404);
    throw new Error('Weight record not found');
  }

  await validateWriteAction(req, res);

  const updatedWeight = await Weight.findByIdAndUpdate(
    req.params.id,
    {
      ...req.body,
      differences: Number(req.body.maximum - req.body.minimum).toFixed(2),
    },
    {
      new: true,
    }
  );
  res.status(200).json(updatedWeight);
});

/**
 * @desc    deleteWeight method delete a weight record based on specified id on its params
 * @route   DELETE /api/weights/:id
 * @access  Public
 */
const deleteWeight = asyncHandler(async (req, res) => {
  const weight = await Weight.findById(req.params.id);
  if (!weight) {
    res.status(404);
    throw new Error('Weight record not found');
  }
  await weight.remove();
  res.status(200).json({
    id: req.params.id,
    message: `successfully removes weight: ${req.params.id}`,
  });
});

/**
 * @desc    validateWriteAction method validate payload sent from FE for create and update api
 * @desc    for update action, FE should sent full body payload like create action
 * @access  Private
 */
const validateWriteAction = async (req, res) => {
  if (!req.body.date || !req.body.minimum || !req.body.maximum) {
    res.status(400);
    throw new Error('Required fields missing');
  }

  if (req.body.minimum > req.body.maximum) {
    res.status(400);
    throw new Error(
      'Bad request - minimum shouldnt be greater than maximum value'
    );
  }
};

module.exports = {
  getWeights,
  getWeight,
  getWeightStats,
  createWeight,
  updateWeight,
  deleteWeight,
};
