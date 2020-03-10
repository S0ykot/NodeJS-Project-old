var express = require('express');
const model_user= require.main.require('./models/model_user');
var router = express.Router();
const{check, validationResult}=require('express-validator/check');
const{matchedData, sanitizeBody}=require('express-validator/filter');

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.get('/',
	[check('userid','User ID is Empty').isEmpty(),
	check('fname','First Name is Empty').isEmpty(),
	check('lname','Last Name is Empty').isEmpty(),
	check('email','Email is Empty').isEmpty(),
	check('dept','Department is Empty').isEmpty(),
	check('cgpa','CGPA is Empty').isEmpty(),
	check('credit','Credit is Empty').isEmpty(),
	check('contact','Contact Number is Empty').isEmpty(),
	check('regDate','Registration Date is Empty').isEmpty()
	],function(req,res){
	var errors = validationResult(req);
	var data=matchedData(req);
	console.log(errors.mapped());
	console.log(data);
	if(req.cookies['username']!=null)
	{
			console.log('login page requested!');
			model_user.getById(req.cookies['username'],function(results){
			//console.log(results);
			res.render('home/index',{title: 'Welcome',user:results, error:errors.mapped() , moment:require('moment'), check:false});
		});
	}else{
		res.redirect('/logout');
	}
});

router.post('/',
	[check('userid','User ID is Empty').not().isEmpty(),
	check('fname','First Name is Empty').not().isEmpty(),
	check('lname','Last Name is Empty').not().isEmpty(),
	check('email','Email is Empty').not().isEmpty(),
	check('dept','Department is Empty').not().isEmpty(),
	check('cgpa','CGPA is Empty').not().isEmpty(),
	check('credit','Credit is Empty').not().isEmpty(),
	check('contact','Contact Number is Empty').not().isEmpty(),
	check('regDate','Registration Date is Empty').not().isEmpty()
	],function(req,res){
	if(req.cookies['username']!=null)
	{
		console.log('login page requested!');
		var user={
			userid:req.body.userid,
			fname:req.body.fname,
			lname:req.body.lname,
			email:req.body.email,
			dept:req.body.dept,
			cgpa:req.body.cgpa,
			credit:req.body.credit,
			contact:req.body.contact,
			regDate:req.body.regDate
		}
		var errors = validationResult(req);
		var data=matchedData(req);
		console.log(errors.mapped());
		console.log(data);
		if(!errors.isEmpty())
		{
			res.render('home/index',{title: 'Welcome',user:data, error:errors.mapped(),moment:require('moment'),check:true});	
		}else{
			model_user.update(user,function(status){
			if(status){
				res.render('home/index',{title: 'Welcome',user:data, error:errors.mapped() ,moment:require('moment'),check:true});
			}
		});
		}
	}else{
		res.redirect('/logout');
	}
});


module.exports = router;