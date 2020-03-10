const express = require('express');
var multer = require('multer');
var path = require('path');
const model_user= require.main.require('./models/model_user');
const model_login= require.main.require('./models/model_login');
const model_verification= require.main.require('./models/model_verification');
router = express.Router();

router.use(express.static(__dirname+'./public'));

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

var Storage=multer.diskStorage({
	destination:'./public/upload/verification',
	filename:function(req,file,callback){
		callback(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname));
	}
})

var upload = multer({
	storage:Storage,
}).single('file');


router.get('/',function(req,res){res.clearCookie('username');res.render('reg/index');});
router.post('/',upload,function(req,res){
	var user={
		userid:req.body.userid,
		fname:req.body.fname,
		lname:req.body.lname,
		email:req.body.email,
		dept:req.body.dept,
		cgpa:req.body.cgpa,
		credit:req.body.credit,
		contact:req.body.contact,
		regDate:today,
		file:req.file.filename,
		status:'inactive'
	};
//	console.log(user);
	model_user.insert(user,function(results){
		if(results)
		{
			model_login.insert(user,function(results){
				if(results)
				{
					model_verification.insert(user,function(results){
						if(results){
							res.redirect('/login');
						}else{
							res.redirect('/reg');
						}
					});
				}else{
					res.redirect('/reg');
					//res.redirect('/reg');
				}
			});
		}else{
			res.redirect('/reg');
		}
	});
});

module.exports = router;