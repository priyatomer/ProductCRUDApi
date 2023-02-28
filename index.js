const express = require('express');
const createError = require('http-errors');
const app = express();

app.use('/uploads', express.static('./uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Initialize Db
require('./initDB')();

const ProductRoute = require('./Routes/Product.route');
app.use('/products', ProductRoute);

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
