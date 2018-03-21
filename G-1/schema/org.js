var mongoose = require("mongoose");
var BranchSchema = new mongooes.Schema({
State: String,
City: String,
Addres: String,
Pincode: Number,
PhoneNo: Number
});
var OrganisationSchema = new mongoose.Schema({
Name: String,
Type: String,
Branches:[BranchSchema]
});

module.exports = mongoose.model("Organisation",OrganisationSchema);
