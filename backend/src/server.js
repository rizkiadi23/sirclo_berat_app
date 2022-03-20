const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const connectMongoDB = require('./configs/mongoDb');
const { errorHandler } = require('./middlewares/errorMiddleware');
const port = process.env.PORT || 9000;

// Initialize connection with the MongoDB
connectMongoDB();

// Init Express Server
const server = express();

// Register Cors Middleware
if (process.env.NODE_ENV === 'development') {
  server.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: false,
    })
  );
}

// Register Basic Express Middleware
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Register API Routes
server.use('/api/weights', require('./routes/weightRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '../../frontend/build')));
  server.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, '../', '../', 'frontend', 'build', 'index.html')
    );
  });
} else {
  server.get('/', (req, res) => {
    res.send(
      'This server run on development mode, to access frontend service you could go to http://localhost:3000'
    );
  });
}

// Register Custom Error Handler
server.use(errorHandler);

server.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
