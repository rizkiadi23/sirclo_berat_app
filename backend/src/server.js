const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const connectMongoDB = require('./configs/mongoDb');
const { errorHandler } = require('./middlewares/errorMiddleware');
const port = process.env.PORT || 9000;

connectMongoDB();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use('/api/weights', require('./routes/weightRoutes'));

server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
