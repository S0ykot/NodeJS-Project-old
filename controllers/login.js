var express = require('express');
const model_login= require.main.require('./models/model_login');
const model_user= require.main.require('./models/model_user');
var router = express.Router();


router.get('/',function(req,res){
	//res.cookie('username', null);
	res.clearCookie('username');
	console.log('login page requested!');
	res.render('login/index');
});

router.post('/', function(req, res){
	var user={
		userid:req.body.userid,
		password:req.body.password
	}
	model_login.validate(user,function(results){
		if(results){
			model_login.getById(user.userid,function(results){
				if(results.role=='student'){
					model_user.getById(user.userid,function(results){
						if(results.status=='active'){
							res.cookie('username', req.body.userid);
							res.redirect('/home');
						}else{
							res.redirect('/login');
						}
					});
					
				}else{
					res.redirect('/login');
				}
			});
		}else{
			res.redirect('/login');
		}
	});
});

module.exports = router;