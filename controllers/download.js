var express = require('express');
var router = express.Router();
const path = require('path');
const model_files= require.main.require('./models/model_files');

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});
router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		model_files.getById(req.cookies['username'],function(result){
			if(result!=null){
				var data={
					name: req.cookies['username'],
					user:result
					}
					console.log('login page requested!');
				
					res.render('download/index',data);
			}else{
				var data={
					name: req.cookies['username'],
					user:result
					}
					console.log('login page requested!');
				
					res.render('download/index',data);
			}
		});
		
	}else{
		res.redirect('/logout');
	}
});

router.get('/download/:file(*)',function(req,res){
	if(req.cookies['username']!=null)
	{
		  var file = req.params.file;
		  var fileLocation = path.join('./public/upload/student',file);
		  console.log(fileLocation);
		  res.download(fileLocation, file); 
		
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