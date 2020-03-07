var express = require('express');
const model_login= require.main.require('./models/model_login');
var router = express.Router();


router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		console.log('changePassword page requested!');
		res.render('changePassword/index',{userid:req.cookies['username']});
	}else{
		res.redirect('/logout');
	}
});

router.post('/',function(req,res){
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
							res.redirect('/cngPass');
						}
					});
				}
				else
				{
					res.redirect('/cngPass');
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