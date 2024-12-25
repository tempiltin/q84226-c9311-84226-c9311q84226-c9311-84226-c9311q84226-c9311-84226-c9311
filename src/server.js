const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const articlesRouter = require('./routes/v1/articles');
const technoRouter = require('./routes/v1/techno');
const contactRouter = require('./routes/v1/contact');
const { errorHandler } = require('./middleware/errorHandler');

require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Logging
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Documentation',
      version: '1.0.0',
      description: 'API documentation for Articles, Technology, and Contact endpoints'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./src/routes/v1/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/info', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// API Routes
app.use('/api/v1', articlesRouter);
app.use('/api/v1', technoRouter);
app.use('/api/v1', contactRouter);

// Error handling
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://temurbekshukurov0707:CtjfTeh1GQeWXrwt@cluster0.jgrgqhl.mongodb.net/tempiltinuz', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;