const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRouter = require('./routes/order');
const loginRouter = require('./routes/login');
const userRouter = require('./routes/user');
const cors = require('cors');
const auth = require('./middlewares/auth');

const app = express();
mongoose.connect('mongodb://127.0.0.1/miramDB');

const options = {
  origin: ['http://localhost:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

app.use('*', cors(options));

app.use(bodyParser.json());

app.use('/', loginRouter);
app.use(auth);
app.use('/', orderRouter);
app.use('/', userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
