const mongoose = require('mongoose');

module.exports = () => {
	//Database Connection
	mongoose
		.connect('mongodb+srv://cluster0.atvo8qm.mongodb.net/', {
			dbname: 'test',
			user: 'priya',
			pass: 'Zn6wVzAf5Fkg9oc5',
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false
		})
		.then(() => console.log('MongoDb Connected!......'))
		.catch((err) => console.log(err.message));

	//Connected Event
	mongoose.connection.on('connected', () => {
		console.log('Mongoose connected to db....');
	});
	//Error Event
	mongoose.connection.on('error', (err) => {
		console.log(err.message);
	});
	//DisConnected Event
	mongoose.connection.on('disconnected', () => {
		console.log('Mongoose connection is disconnected....');
	});

	//Close connection of mongoose ny pressing ctrl c
	process.on('SIGINT', () => {
		mongoose.connection.close(() => {
			console.log('Mongoose connection is disconnected due to app termination....');
			process.exit(0);
		});
	});
};
