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
  if(req.cookies['username']!=null)
  {
    userModel.allTopic("",function(result) {
      res.render('TeacherViewTopic',{data:result,userid:req.cookies['username']});
    });
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;