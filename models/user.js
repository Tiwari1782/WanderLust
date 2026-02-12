const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({  
//username and password gets automatically in due to passport-local-mongoose
  email: {
    type: String,
    required: true, 
  },
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);

