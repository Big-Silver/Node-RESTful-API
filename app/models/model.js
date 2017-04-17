var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ModelSchema   = new Schema({
	name: String,
	age:  Number
});

module.exports = mongoose.model('Model', ModelSchema);