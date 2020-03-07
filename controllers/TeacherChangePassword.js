var express = require('express');
var router = express.Router();
var userModel	= require.main.require('./models/teacher-model');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    res.render('TeacherChangePassword',{userid:req.cookies['username']});
  }else{
    res.redirect('/logout');
  }
});


router.post('/',function(req,res){
  var data = {
  	oldPass : req.body.oldPass,
  	newPass : req.body.newPass,
  	confirmNewPass : req.body.confirmNewPass,
  	userid : req.cookies['username']
  };

  	userModel.passwordMatch(req.cookies['username'],function(result) {
  		if (data.oldPass==result.password) {
  			if (data.newPass==data.confirmNewPass) {
  				userModel.updatePassword(data,function(status) {
  					if (status) {
  						res.redirect('/logout');
  					}
  					else
  					{
  						res.redirect('/TeacherChangePassword');
  					}
  				})
  			}
  			else
  			{
  				res.send("new or confirm password not matching");
  			}
  		}
  		else
  		{
  			res.send("Old password not matching");
  		}
  	});

});


module.exports = router;