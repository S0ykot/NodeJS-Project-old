var express = require('express');
var router = express.Router();
var userModel = require.main.require('./models/teacher-model');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});



router.get('/',function(req,res){
    userModel.getById(req.cookies['username'],function(result){
      res.render('TeacherProfile',{details:result});
    });
    
});


router.post('/',function(req,res){
    var data = {
    	fname : req.body.fname,
    	lname : req.body.lname,
    	email : req.body.email,
    	pass  : req.body.password,
    	contact : req.body.contact,
    	userid	: req.cookies['username']
    };
    userModel.passwordMatch(req.cookies['username'],function(result) {
    	if (result.password=data.pass) {
    		userModel.updateProfile(data,function(status) {
    			if (status) {
    				userModel.getById(req.cookies['username'],function(result){
      				res.render('TeacherProfile',{details:result});
    				});
    			}
    			else
    			{
    				res.send("Wrong!");
    			}
    		});
    	}
    	else
    	{
    		res.send("Current password not correct");
    	}
    });
});



module.exports = router;