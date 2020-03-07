var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username']
		}
		console.log('login page requested!');
	
		res.render('download/index',data);
	}else{
		res.redirect('/logout');
	}
});

/*router.post('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username']
		}
		console.log('login page requested!');
	
		res.render('home',data);
	}else{
		res.redirect('/logout');
	}
});*/


module.exports = router;