var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model('Project', new Schema({
  title : String,
  description: String,
  owner : String,
  division : String,
  benefitArea : String,
  startDate : Date,
  originatingProperty : String,
  originatingPropertyContact : String,
  originatingPropertyImpact : String,
  templateName : String,
  templateData : Array
}));
