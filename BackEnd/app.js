const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const logger = require("morgan");

const users = require('./routes/users');
const item = require('./routes/item');
const cart = require('./routes/cart');
const order = require('./routes/order');

dotenv.config();

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Header", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

require('./db/mongoose');

app.use(logger('dev'));
app.use(express.json());


const port = process.env.PORT || 3000;
//Routes
app.use('/users', users);
app.use('/item', item);
app.use('/cart', cart);
app.use('/order', order);

//Catch 404 Error
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

//Error Handler
app.use((err, req, res, next) => {
    const error = process.env.ENV == 'dev' ? err : {};
    const status = err.status ? err.status : 500;

    res.status(status).json({
        error: {
            message: error.message,
        }
    });
})

//Start
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});