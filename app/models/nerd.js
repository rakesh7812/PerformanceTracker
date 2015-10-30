var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var nerdSchema = new Schema({
  name : String
});

module.exports = mongoose.model('Nerd',nerdSchema);
