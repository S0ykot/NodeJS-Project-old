var express = require('express');
var router = express.Router();

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});

router.get('/',function(req,res){
  res.render('TeacherProgressUpdate');
});


module.exports = router;