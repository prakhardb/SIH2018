var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name        : String,
    type        : String,
    img         : String,
    website     : String,
});

module.exports = mongoose.model("organisation",UserSchema);