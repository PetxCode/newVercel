const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const userModel = require("../model/userModel");
const cloudinary = require("../utils/cloudinary");
const {
	passwordResetEmail,
	verifiedEmail,
	reVerifiedEmail,
} = require("../utils/sendMail");

const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "Gideonekeke64@gmail.com",
		pass: "sgczftichnkcqksx",
	},
});

const allUser = async (req, res) => {
	try {
		const all = await userModel.find();
		res.status(200).json({
			message: "all gotten",
			data: all,
		});
	} catch (error) {
		console.log(error.message);
	}
};
const singleUser = async (req, res) => {
	try {
		const all = await userModel.findById(req.params.id);
		res.status(200).json({
			message: "single user gotten",
			data: all,
		});
	} catch (error) {
		console.log(error.message);
	}
};
const deleteUser = async (req, res) => {
	try {
		const all = await userModel.findByIdAndDelete(req.params.id);
		res.status(204).json({
			message: "user deleted",
		});
	} catch (error) {
		console.log(error.message);
	}
};

const updateUserImage = async (req, res) => {
	try {
		const { fullName } = req.body;

		const user = await findById(req.params.id);

		if (user) {
			await cloudinary.uploader.destroy(user.avatarID);
			const image = await cloudinary.uploader.upload(req.file.path);
			const all = await userModel.findByIdAndUpdate(
				user._id,
				{
					avatar: image.secure_url,
					avatarID: image.public_id,
				},
				{ new: true }
			);
			res.status(200).json({
				message: "all gotten",
				data: all,
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

const updateUserInfo = async (req, res) => {
	try {
		const { fullName } = req.body;

		const user = await findById(req.params.id);

		if (user) {
			const all = await userModel.findByIdAndUpdate(
				user._id,
				{
					fullName,
				},
				{ new: true }
			);
			res.status(200).json({
				message: "all gotten",
				data: all,
			});
		}
	} catch (error) {
		console.log(error.message);
	}
};

const createUser = async (req, res) => {
	try {
		const { fullName, email, password } = req.body;

		const salt = await bcrypt.genSalt(10);
		const hashed = await bcrypt.hash(password, salt);

		const user = await userModel.create({
			fullName,
			email,
			password: hashed,
			verifiedToken: token,
		});

		verifiedEmail(email, user._id)
			.then((result) => {
				console.log(result);
			})
			.catch((err) => console.log(err));

		res.status(200).json({
			message: "check your mail",
		});
	} catch (error) {
		console.log(error.message);
	}
};

module.exports = {
	allUser,
	singleUser,
	deleteUser,
	createUser,
	updateUserInfo,
	updateUserImage,
};
