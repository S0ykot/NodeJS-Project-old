var express = require('express');
const model_login= require.main.require('./models/model_login');
const{check, validationResult}=require('express-validator/check');
const{matchedData, sanitizeBody}=require('express-validator/filter');
var router = express.Router();

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});
router.get('/',
	[check('opass','Old Password is Empty').isEmpty(),
	check('npass','New Password is Empty').isEmpty(),
	check('cnpass','Confirm Password is Empty').isEmpty(),
	],function(req,res){
	if(req.cookies['username']!=null)
	{
		var errors = validationResult(req);
		var data=matchedData(req);
		console.log('changePassword page requested!');
		res.render('changePassword/index',{userid:req.cookies['username'], error:errors.mapped()});
	}else{
		res.redirect('/logout');
	}
});

router.post('/',
	[check('opass','Old Password is Empty').not().isEmpty(),
	check('npass','New Password is Empty').not().isEmpty(),
	check('cnpass').custom((value,{req})=>{
		if(value!=req.body.npass){
			throw new Error('Confirm Password Does not Matched');
		}
	})
	],function(req,res){
	if(req.cookies['username']!=null)
	{	
		var user={
			oldPass: req.body.opass,
			newPass: req.body.npass,
			cnewPass: req.body.cnpass
		}
		console.log('changePassword page requested!');
		model_login.getById(req.cookies['username'],function(results)
		{
			var errors = validationResult(req);
			var data=matchedData(req);
			console.log(results);
			if(user.oldPass==results.password)
			{
				if(user.newPass==user.cnewPass)
				{
					model_login.update(user,function(status)
					{
						if(status)
						{
							res.redirect('/logout');
						}
						else
						{
							res.render('changePassword/index',{userid:req.cookies['username'], error:errors.mapped()});
						}
					});
				}
				else
				{
					res.render('changePassword/index',{userid:req.cookies['username'], error:errors.mapped()});
				}
			}
			else
			{
				res.redirect('/cngPass');
			}
		});
	}
	else
	{
		res.redirect('/logout');
	}
});
module.exports = router;