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
		var data={
		name: req.cookies['username']
		}
		console.log('Home page requested!');
		res.render('Teacherhome',data);
	}else{
		res.redirect('/logout');
	}
});

module.exports = router;