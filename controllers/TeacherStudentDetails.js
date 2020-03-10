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
   userModel.allStudent("",function(result){
      res.render('TeacherStudentDetails',{details:result});
   });
});



module.exports = router;