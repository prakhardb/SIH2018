var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    state: String,
    city: String,
    manager: String,
    phonenumber: String,
    address: String,
    pincode: String,
    ifsc: String,
});

module.exports = mongoose.model("branch",UserSchema);