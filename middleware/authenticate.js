const jwt = require('jsonwebtoken');

const User = require('../Models/User.model');

const authenticate = async (req, res, next) => {
	try {
		const token = req.headers.authorization;
		const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
		const rootUser = await User.findOne({ _id: verifyToken._id, 'tokens.token': token });

		if (!rootUser) {
			throw new Error('User not found');
		}
		req.token = token;
		req.rootUser = rootUser;
		req.userID = rootUser._id;
		next();
	} catch (err) {
		res.status(401).json({ status: 401, message: 'Unauthorized:No token Provided' });
		console.log(err, 'authentication error');
	}
};

module.exports = authenticate;
