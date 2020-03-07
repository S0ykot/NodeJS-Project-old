const express = require('express');
const model_user= require.main.require('./models/model_user');
const model_login= require.main.require('./models/model_login');
router = express.Router();


router.get('/',function(req,res){res.render('reg/index');});
router.post('/',function(req,res){
	var user={
		userid:req.body.userid,
		fname:req.body.fname,
		lname:req.body.lname,
		email:req.body.email,
		contact:req.body.contact,
		dept:req.body.dept,
		cgpa:req.body.cgpa,
		credit:req.body.credit
	};

	model_user.insert(user,function(results){
		if(results)
		{
			model_login.insert(user,function(results){
				if(results)
				{
					res.redirect('/login');
				}else{
					res.send('PAGOL');
					//res.redirect('/reg');
				}
			});
		}else{
			res.redirect('/reg');
		}
	});
});

module.exports = router;