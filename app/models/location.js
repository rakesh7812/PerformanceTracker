var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model('Location', new Schema({
  name : String
}));
