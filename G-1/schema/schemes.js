var mongoose = require("mongoose");
var Schemes = new mongooes.Schema({
Organisationid: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation"
  }]
  RateIntrest: Number,
  ProcessingFee: Number,
  SecurityType: String,
  TenureTime: String,
  Min-MaxAmount: Number,
  Investment: Number,
  ProcessingTime:String, 
});
