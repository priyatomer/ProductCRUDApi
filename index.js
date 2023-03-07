const dotenv = require('dotenv');
const express = require('express');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

dotenv.config({ path: './config.env' });
app.use('/uploads', express.static('./uploads'));
app.use(express.json()); //middleware // parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Initialize Db
require('./initDB')();

//import and Using Routes
const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

const UserRoute = require('./Routes/UserRoute');
app.use('/', UserRoute);

app.use((req, res, next) => {
	// const err = new Error('Not Found');
	// err.status = 404;
	// next(err);

	next(createError(404, 'Not Found'));
});

//Error Handler
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	res.send({
		error: {
			status: err.status || 500,
			message: err.message
		}
	});
});

//Listen to app
app.listen(3000, () => {
	console.log('Server started on port 3000....');
});
