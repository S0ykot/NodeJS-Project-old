var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();

router.use(express.static(__dirname+'./public'));

/*var Filename=function(req,file,callback){
	callback(null,file.filename+'_'+Date.now()+path.extname(file.originalname));
}
*/
var Storage=multer.diskStorage({
	destination:'./public/upload/student',
	filename:function(req,file,callback){
		callback(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
	}
})

var upload = multer({
	storage:Storage,
}).single('file');

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username'],
		success:''
		}
		console.log('upload page requested!');
	
		res.render('upload/index',data);
	}else{
		res.redirect('/logout');
	}
});

/*router.get('/upload',function(req,res){
	if(req.cookies['username']!=null)
	{
		var data={
		name: req.cookies['username']
		}
		console.log('upload page requested!');
	
		res.render('upload/upload',data);
	}else{
		res.redirect('/logout');
	}
});
*/
router.post('/',upload,function(req,res,next){
	if(req.cookies['username']!=null)
	{
		var success = req.file.filename+' Uploaded Successfully';
		var data={
		name: req.cookies['username'],
		success:success
		}
		console.log('upload page requested!');
	
		res.render('upload/index',data);
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