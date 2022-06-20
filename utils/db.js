const mongoose = require("mongoose");
const url = "mongodb://localhost/authTest";
const url2 =
	"mongodb+srv://classBuild:classBuild@cluster0.75kqx.mongodb.net/TestAuthDB?retryWrites=true&w=majority";

mongoose.connect(url2).then(() => {
	console.log("database is now connected...!");
});

module.exports = mongoose;
