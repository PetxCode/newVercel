const express = require("express");
require("./utils/db");
const app = express();
const port = process.env.PORT || 2070;
const cors = require("cors");
const verifiedEmail = require("./utils/sendMail");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.json({ message: "This is the starting point...!" });
});

app.post("/view", (req, res) => {
	const { email } = req.body;

	res.json({ message: "getting access...!" });
});

app.use("/api/user", require("./controller/userRouter"));

app.listen(port, () => {
	console.log(`listening to port ${port}`);
});

module.exports = app;
