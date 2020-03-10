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

router.get('/:id',function(req,res){
   var key = req.params.id;
   userModel.searchStudent(key,function(result){
      res.render('studSearch',{details:result});
   });
});



module.exports = router;