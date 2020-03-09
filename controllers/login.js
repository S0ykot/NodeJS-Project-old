var express = require('express');
var router = express.Router();
var userModel	= require.main.require('./models/teacher-model');
var md5 = require('md5');

router.get('/',function(req,res){
	console.log('login page requested!');
	res.render('login',{error:null});
});

router.post('/', function(req, res){
	
	var user = {
		username : req.body.uname,
		password : req.body.password
	};

	userModel.loginValidate(user,function(status){
		if (status) {
			res.cookie('username', req.body.uname);
			res.cookie('token', md5(req.body.password));
			res.redirect('/TeacherHome');
		}
		else
		{
			res.render('login',{error:"has"});
		}
	});
});

module.exports = router;