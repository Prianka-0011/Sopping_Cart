const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const path = require('path');
const port = 3000;
const productRouter = require('./routes/productRouter');
app.use(express.static(path.join(__dirname, '../client')));
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Shopping Cart',
    version: '1.0.0',
    description: 'Shopping Cart API Description',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js', './app.js'], // Add the path to your login route file
};

const swaggerSpec = swaggerJSDoc(options);

app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('It\'s working');
});

let db = [
  { id: 1, username: 'Prianka', password: '111' },
  { id: 2, username: 'Edward', password: '222' }
];

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 * /login:
 *   post:
 *     summary: User login
 *     description: Logs in a user with the provided credentials and returns an access token and user information.
 *     tags: [Authentication] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 userInfo:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = db.find(user => user.username === username && user.password === password);
  if (user) {
    const accessToken = `${user.id}-${user.username}-${Date.now().toString()}`;
    const userInfo = user.username;
    res.json({ accessToken, userInfo });
  } else {
    res.status(401).json({ error: 'Invalid username and password!' });
  }
});

app.use('/products', productRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
