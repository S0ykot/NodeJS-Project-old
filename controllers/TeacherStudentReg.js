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
  if(req.cookies['token']!=null)
  {
    console.log('Student Add requested!');
    res.render('TeacherStudentReg',{userid:req.cookies['username']});
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;