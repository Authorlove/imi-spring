var mongoose = require('mongoose'),
	movieSchemas = require('../schemas/movieSchema'),
	userSchemas = require('../schemas/userSchema');

var Movie = mongoose.model('movie', movieSchemas);//电影数据表
var User = mongoose.model('user', userSchemas);//用户数据表


//电影数据方法 S
function Check_movie() {}
Check_movie.prototype.save = function(obj, path, callback) {
	var instance = new Movie(obj);
	instance.pic_path = path;
	instance.save(function(err) {
		callback(err);
	});
}

Check_movie.prototype.show = function(callback) {
	Movie.find(function(err, data) {
		callback(data);
	});
}

Check_movie.prototype.showone = function(id,callback) {
	Movie.findOne({_id:id},function(err,data){
		if(err){
			console.log(err);
			return false;
		}
		callback(data);
	});
}
//电影数据方法 E


//用户数据方法 S
function Check_user(){}

Check_user.prototype.save = function(obj,callback){
	var instance = new User(obj);
	instance.save(function(err) {
		callback(err);
	});
}

Check_user.prototype.check = function(req,res){
	var self = this;
	User.findOne({ username: req.body.username },'username',function(err,user){
		if(err){
			console.log(err);
			return false;
		}
		if(user){
			res.end('<p>该用户名已存在，请重新输入</p><a href="/register">返回</a>');
			return false;
		}
		
		self.save(req.body,function(err){
			if (err) {
				console.log(err);
			}
			res.render('gegistersuccess')
		});
	});
}

Check_user.prototype.login = function(req,res){
	console.log(req.body)
	
	User.findOne({ username: req.body.username },function(err,user){
		console.log(user)
		if(err){
			console.log(err);
			return false;
		}
		if(!user){
			res.end('<!DOCTYPE HTML><html><head><meta charset="utf-8"></head><body><p>用户名不存在</p><a href="/login">返回</a></body></html>');
			return false;
		}
		if(user.password == req.body.password){
			res.redirect('/?username=' + user.username);
		}else{
			res.end('<!DOCTYPE HTML><html><head><meta charset="utf-8"></head><body><p>密码错误</p><a href="/login">返回</a></body></html>');
			return false;
		}
		
		
	});
}



//用户数据方法 E
exports.movie = new Check_movie();
exports.user = new Check_user();
