var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var BearSchema   = new Schema({
	name: String,
	age:  Number
});

module.exports = mongoose.model('Bear', BearSchema);