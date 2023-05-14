const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRouter = require('./routes/order');
const loginRouter = require('./routes/login');
const auth = require('./middlewares/auth');

const app = express();
mongoose.connect('mongodb://127.0.0.1/miramDB');
app.use(bodyParser.json());

app.use('/', loginRouter);
app.use(auth);
app.use('/', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: 'На сервере произошла ошибка' });
});

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
