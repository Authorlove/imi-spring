var module = require('../modules/movie'),
	movie = module.movie,
	user = module.user;

//存储电影数据
function getdata(req, res) {
		movie.save(req.body, req.files.pic.path, function(err) {
			if (err) {
				console.log(err);
			}
		});
		res.end('success');
	}
//查看所有电影数据
function show(req, res) {
	movie.show(function(data){
		//console.log(data);
		res.render('homepage',{movie:data});
	});
}
//查看单个电影数据
function showone(req,res){
	
	movie.showone(req.params.id,function(data){
		res.render('show',{movie:data});
	})
}

//存储用户数据
function saveuser(data) {
		user.save(data, function(err) {
			if (err) {
				console.log(err);
			}
		});
	}

//判断是否存在用户名
function checkuser(req, res) {
	user.check(req,res);
}


function checklogin(req,res){
	user.login(req,res);	
}



exports.get = getdata;
exports.show = show;
exports.checkuser = checkuser;
exports.checklogin = checklogin;
exports.showone = showone;