var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
    name: String,
    type: String,
    img : String,
});

module.exports = mongoose.model("organisation",UserSchema);