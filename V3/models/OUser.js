var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
OrganisationName: String,
TypeOfOrganisation: String,
username: String,
password: String,
isAdmin :{type:Boolean, default:false}
});
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("OUser",UserSchema);