const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: Number,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	confirmPassword: {
		type: String,
		required: true
	},
	tokens: [
		{
			token: {
				type: String,
				required: true
			}
		}
	]
});

//we are hashing the password
UserSchema.pre('save', async function (next) {
	if (this.isModified('password')) {
		this.password = await bcrypt.hash(this.password, 12);
		this.confirmPassword = await bcrypt.hash(this.confirmPassword, 12);
	}
	next();
});

//we are generating token
UserSchema.methods.generateAuthToken = async function () {
	try {
		let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, {
			expiresIn: '1d'
		});
		this.tokens = this.tokens.concat({ token: token });
		//for saving token
		await this.save();
		return token;
	} catch (err) {
		console.log(err);
		res.status(422).json(err);
	}
};

const User = mongoose.model('user', UserSchema);
module.exports = User;
