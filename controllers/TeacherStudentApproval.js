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
  if(req.cookies['username']!=null)
  {
    console.log('Student approval requested!');
    res.render('TeacherStudentApproval');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;