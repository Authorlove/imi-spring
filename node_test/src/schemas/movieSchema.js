var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	


var movieSchemas = new Schema({
	Id:{type:mongoose.Schema.ObjectId},
	name:String,
	nickname:String,
	info:String,
	doctor:String,
	location:String,
	bitch:String,
	pic_path:String,
	href:String,
	meta:{
		creatAt:{type:Date,default:Date.now()},
		updateAt:{type:Date,default:Date.now()}
	},
	comment:[]
})

module.exports = movieSchemas;

