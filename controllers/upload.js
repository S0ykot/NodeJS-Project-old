var express = require('express');
var multer = require('multer');
var path = require('path');
const model_files= require.main.require('./models/model_files');
var router = express.Router();

router.get('*',function(req,res,next){
	if(req.cookies['username']!=null){
		next();
	}else{
		res.redirect('/login');
	}
});

router.use(express.static(__dirname+'./public'));

/*var Filename=function(req,file,callback){
	callback(null,file.filename+'_'+Date.now()+path.extname(file.originalname));
}
*/

function checkFileType(file, callback){
  var filetypes = /pdf|doc|docs/;
  var extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  var mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return callback(null,true);
  } else {
    callback('Invalid File Uploaded!!');
  }
}

var Storage=multer.diskStorage({

	destination:'./public/upload/student',
	filename:function(req,file,callback){
		callback(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
	}
})


var upload = multer({
	storage:Storage,
	 limits:{fileSize: 5767168},
  fileFilter: function(req, file, callback){
    checkFileType(file, callback);
  }
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
router.post('/',upload,function(req,res,next)
{
	if(req.cookies['username']!=null)
	{
		upload(req, res, function(err)
		{
		    if(err)
		    {
		    	console.log(err);
		    	var data={
						name: req.cookies['username'],
						success:err
						}
		      	res.render('upload/index', data);
		    } 
		    else 
		    {
			      if(req.file == undefined)
			      {
			        var data={
						name: req.cookies['username'],
						success:'No File Selected'
						}
		     		 res.render('upload/index', data)
			      } 
			      else
			      {
						model_files.insert({userid: req.cookies['username'], file: req.file.filename},function(results)
						{
							if(results)
							{
								var success = req.file.filename+' Uploaded Successfully';
								var data={
								name: req.cookies['username'],
								success:success,
								}
								console.log('upload page requested!');
								res.render('upload/index',data);
							}
							else
							{
								var data={
										name: req.cookies['username'],
										success:'Error!!'
										}
									
										res.render('upload/index',data);
							}
						});
				   }
			}
		});		

	}
	else
	{
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