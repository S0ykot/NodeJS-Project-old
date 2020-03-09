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
    console.log('Student Add requested!');
    res.render('TeacherStudentReg',{userid:req.cookies['username']});
  }else{
    res.redirect('/logout');
  }
});


router.post('/',function(req,res){
  var today = new Date();
  var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  var data ={
    userid : req.body.userId,
    fname  : req.body.fname,
    lname  : req.body.lname,
    email  : req.body.email,
    contact : req.body.phnNo,
    cgpa  : req.body.cgpa,
    dept : req.body.dept,
    credit : req.body.credit,
    regDate : sysDate
  };

  userModel.regStudent(data,function(status) {
    if (status) {
      res.send("Student added");
    }
    else
    { 
      res.send("Something wrong");
    } 
  })


});



module.exports = router;