var express = require('express');
var multer = require('multer');
var push = require('./app/push');
var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1/movie');


var fs = require('fs');

var app = express();


app.engine('html', require('ejs').__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

app.use(multer({
	dest:'./uploads/',
	rename:function(fieldname, filename,req,res){
		if(!req.body.nickname){
			return 'false';
		}else{
			return req.body.nickname + Date.now();
		}
	}
}));

//Route S
app.get('/',function(req,res){
	//res.render('homepage');
	push.show(req,res);
});

app.get('/login',function(req,res){
	res.render('login');
});

app.get('/push',function(req,res){
	res.render('push');
});

app.get('/register',function(req,res){
	res.render('register');
});

app.post('/send/data',push.get);//get movie data
app.post('/send/register',push.checkuser);//get register data
app.post('/send/login',push.checklogin);


app.get('/movie/:id',push.showone);


//debug
app.get('/test',function(req,res){
	//push.show(req,res)
	//push.checkuser(req,res);
});


app.all('*',function(req,res,next){
	res.sendStatus(404);
})

//Route E



app.listen(3000);



