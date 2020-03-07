var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
  if(req.cookies['username']!=null)
  {
    console.log('Change password requested!');
    res.render('TeacherChangePassword');
  }else{
    res.redirect('/logout');
  }
});

module.exports = router;