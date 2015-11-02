var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model('Master', new Schema({
  projectId : String,
  locationId : String,
  data : Array,
  invitedBy : String,
  createDate : Date,
  totalRevenue : Number
}));
