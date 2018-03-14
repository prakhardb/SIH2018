var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");


var UserSchema = new mongoose.Schema({
    usename:  String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Admin",UserSchema);