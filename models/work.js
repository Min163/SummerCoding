var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var workSchema = new Schema({

	workTitle: String,
	contents: String,
	updated_at: { type: Date, default: Date.now },
	completed: { type: Boolean, default: false },

	deadline : Date,
	priority : { type: String, default: "FIRST", enum: ["FIRST", "SECOND", "THIRD", "FOURTH"] },

});

module.exports = mongoose.model('work', workSchema);