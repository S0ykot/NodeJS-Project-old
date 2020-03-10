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
  if(req.cookies['token']!=null)
  {
    userModel.getTeacherName(req.cookies['username'],function(result){
      userModel.getDomain("",function(domain) {
        res.render('TeacherTopicAdd',{userid:req.cookies['username'],teacher:result,dom:domain});
      });
    });
    
  }else{
    res.redirect('/logout');
  }
});



router.post('/',function(req,res){
  var data ={
    topicName : req.body.topicName,
    type : req.body.type,
    domain : req.body.domain,
    supervisor : req.body.supervisor,
    desc : req.body.topicDes,
    userid : req.cookies['username']
  };

  userModel.addTopic(data,function(status){
    if (status) {
      res.redirect('/TeacherViewTopic');
    }
    else
    {
      res.redirect('/TeacherTopicAdd');
    }
  });

});

module.exports = router;