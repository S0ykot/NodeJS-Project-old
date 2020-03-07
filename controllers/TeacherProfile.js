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

module.exports = router;