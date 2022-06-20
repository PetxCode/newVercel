const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
	{
		fullName: {
			type: String,
		},
		email: {
			type: String,
		},
		password: {
			type: String,
		},
		avatar: {
			type: String,
		},
		avatarID: {
			type: String,
		},
		verifiedToken: {
			type: String,
		},
		verified: {
			type: Boolean,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
