const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../Models/User.model');

module.exports = {
	registerUser: async (req, res, next) => {
		console.log(req.body);
		const { name, email, phone, password, confirmPassword } = req.body;
		if (!name || !email || !phone || !password || !confirmPassword) {
			return res.status(422).json({ error: 'Please filled the field properly.' });
		}
		try {
			const userExist = await User.findOne({ email: email });
			if (userExist) {
				return res.status(422).json({ error: 'Email already exists' });
			} else if (password != confirmPassword) {
				return res.status(422).json({ error: 'Password and confirm password are not same.' });
			} else {
				const user = new User({ name, email, phone, password, confirmPassword });
				//here password hashing
				const data = await user.save();
				res.status(201).json({ message: 'User Registered Successfully', data: data });
			}
		} catch (err) {
			console.log(err);
		}
	},
	loginUser: async (req, res) => {
		try {
			const { email, password } = req.body;
			if (!email || !password) {
				return res.status(422).json({ error: 'Please filled the field properly.' });
			}
			const userLogin = await User.findOne({ email: email });
			if (userLogin) {
				const isMatch = await bcrypt.compare(password, userLogin.password);

				if (!isMatch) {
					res.status(400).json({ error: 'Invalid Credentials' });
				} else {
					//for token generation
					const token = await userLogin.generateAuthToken();
					//cookie generate
					res.cookie('usercookie', token, {
						//time when token expires
						expires: new Date(Date.now() + 25892000000),
						httpOnly: true
					});
					const result = {
						userLogin,
						token
					};
					res.status(201).json({ status: 201, result, message: 'User Signin Successfully' });
				}
			} else {
				res.status(400).json({ error: 'Invalid Credentials' });
			}
		} catch (err) {
			console.log(err);
		}
	},
	aboutAUser: async (req, res) => {
		try {
			const validateOneUser = await User.findOne({ _id: req.userID }, { __v: 0 }); //query projection
			//const results = await Product.find({}, { name: 1, _id: 0, price: 1 });//for including price and name field and excluding id field
			res.status(201).json({ status: 201, validateOneUser });
		} catch (error) {
			res.status(401).json({ status: 401, error });
		}
	},
	logoutUser: async (req, res) => {
		try {
			req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
				return curelem.token !== req.token;
			});
			res.clearCookie('usercookie', { path: '/' });
			req.rootUser.save();
			res.status(201).json({ status: 201 });
		} catch (error) {
			res.status(401).json({ status: 401, error });
		}
	}
};
