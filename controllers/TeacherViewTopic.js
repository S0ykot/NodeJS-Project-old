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
    userModel.allTopic(req.cookies['username'],function(result) {
      res.render('TeacherViewTopic',{data:result,userid:req.cookies['username']});
    });
  }else{
    res.redirect('/logout');
  }
});


router.get('/leave/:id',function(req,res){
  userModel.leaveTopic(req.params.id,function(status) {
      if (status) {
        res.redirect('/TeacherViewTopic');
      }
      else
      {
        res.send("Something wrong");
      }
  });
});

module.exports = router;