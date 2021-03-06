const express = require('express');
const dotenv = require('dotenv');
const config = require('./config/config');
const mainRouter = require('./routes/mainRouter');
const usersRouter = require('./routes/usersRouter');
const errorHandler = require('./middleware/errorHandler');
const { sequelize } = require('./db/models');

// инициализация приложения 'app'
const app = express();

// использование данных из конфигурации файла .env
dotenv.config();

// условное формирование порта
const port = process.env.PORT ?? 3000;

// конфигурация приложения
config(app);

// маршрутизация приложения
app.use('/', mainRouter);
app.use('/users', usersRouter);

// обработка ошибок из next(error)
app.use(errorHandler);

// проверка работы ДБ
sequelize.authenticate();

// прослушивание порта приложения
app.listen(port, () => console.log(`*** Server started at ${port} port ***`));

module.exports = app;
