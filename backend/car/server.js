require('dotenv').config();
const app = require('./app.js');
const port = 1339;
const model = require('./models/carModelMongoDb');
const url = process.env.URL_PRE + process.env.MONGODB_PWD + process.env.URL_POST;

model.initialize(url,"Car_db",false).then(app.listen(port));

