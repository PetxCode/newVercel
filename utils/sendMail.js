const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const { google } = require("googleapis");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

const CLIENT_ID =
	"797682682479-tkkhc4rqupt9eamcq78e8e3pjh0sdfi6.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REFRESH_TOKEN =
	"1//04GwqmelD3vjRCgYIARAAGAQSNwF-L9IrUo6125mhgW0x2l5OfiDWwQpFdhMtM6sXvzFPGx3F8G2OfLjJtvghloJ2fSJCg5aWe4I";
const REDIRECT_URL = "https://developers.google.com/oauthplayground";

const oAuthPass = new google.auth.OAuth2(
	CLIENT_ID,
	CLIENT_SECRET,
	REDIRECT_URL
);
oAuthPass.setCredentials({ refresh_token: REFRESH_TOKEN });

const verifiedEmail = async (email, user) => {
	try {
		const createToken = await oAuthPass.getAccessToken();

		const getToken = crypto.randomBytes(32).toString("hex");
		const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "magixauth@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refresh_token: REFRESH_TOKEN,
				accessToken: createToken.token,
			},
		});

		const mailOptions = {
			from: "no-reply ✉️🍾 <magixauth@gmail.com>",
			to: email,
			subject: "Account Verification",
			html: ` <h3>
            This is to verify your account, please click the <a
            href="http://localhost:2070/api/user/${user}/${token}"
            >Link</a> to continue, this link expires in 20mins
        </h3>`,
		};

		const result = transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const reVerifiedEmail = async (email, user) => {
	try {
		const createToken = await oAuthPass.getAccessToken();

		const getToken = crypto.randomBytes(32).toString("hex");
		const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "magixauth@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refresh_token: REFRESH_TOKEN,
				accessToken: createToken.token,
			},
		});

		const mailOptions = {
			from: "no-reply ✉️🍾 <magixauth@gmail.com>",
			to: email,
			subject: "re-Account Verification",
			html: ` <h3>
            This is to verify your account, please click the <a
            href="http://localhost:2070/api/user/${user}/${token}"
            >Link</a> to continue, this link expires in 20mins
        </h3>`,
		};

		const result = transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

const passwordResetEmail = async (email, user) => {
	try {
		const createToken = await oAuthPass.getAccessToken();

		const getToken = crypto.randomBytes(32).toString("hex");
		const token = jwt.sign({ getToken }, "ThisIsIt", { expiresIn: "3d" });

		const transport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "magixauth@gmail.com",
				clientId: CLIENT_ID,
				clientSecret: CLIENT_SECRET,
				refresh_token: REFRESH_TOKEN,
				accessToken: createToken.token,
			},
		});

		const mailOptions = {
			from: "no-reply ✉️🍾 <magixauth@gmail.com>",
			to: email,
			subject: "Account Verification",
			html: ` <h3>
            This is to verify your account, please click the <a
            href="http://localhost:2070/api/user/${user}/${token}"
            >Link</a> to continue, this link expires in 20mins
        </h3>`,
		};

		const result = transport.sendMail(mailOptions);
		return result;
	} catch (error) {
		return error;
	}
};

module.exports = { passwordResetEmail, verifiedEmail, reVerifiedEmail };
