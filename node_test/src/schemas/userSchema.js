var mongoose = require('mongoose'),
	Schema = mongoose.Schema;
	

var userSchemas = new Schema({
	Id:{type:mongoose.Schema.ObjectId},
	username:String,
	password:String,
	email:String,
	phone:Number,
	meta:{
		creatAt:{type:Date,default:Date.now()},
		updateAt:{type:Date,default:Date.now()}
	}
});


module.exports = userSchemas;