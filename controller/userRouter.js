const {
	allUser,
	singleUser,
	deleteUser,
	createUser,
	updateUserInfo,
	updateUserImage,
} = require("./userController");

const upload = require("../utils/multer");
const express = require("express");
const router = express.Router();

router.route("/").get(allUser);

router.route("/create").post(createUser);
router
	.route("/:id")
	.get(singleUser)
	.delete(deleteUser)
	.patch(upload, updateUserImage)
	.patch(updateUserInfo);

module.exports = router;
