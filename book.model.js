var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookSchema = new Schema({
 title: 
 {
   type: String,
   index: true
 },
 author: String,
 category: String
});

module.exports = mongoose.model('Book',BookSchema);
