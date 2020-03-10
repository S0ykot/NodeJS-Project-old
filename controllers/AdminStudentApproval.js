var express 				= require('express');
var router 					= express.Router();
var studentModel   			= require.main.require('./models/student-model');
var userModel   			= require.main.require('./models/user-model');
var verificationModel   	= require.main.require('./models/verification-model');
var download 				= require('download-file')
const path = require('path');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	verificationModel.getAllPendingStudents(function(results){
		if(results.length > 0){
			console.log('Student list requested!');
    		res.render('AdminStudentApproval', {pendingStudents: results});
		}else{
			res.render('AdminStudentApproval', {pendingStudents: []});
		}
	});
})

router.get('/AdminStudentProfile/:id', function(req, res){
	
	studentModel.getByUserId(req.params.id, function(result){
		//console.log(result);
		res.render('AdminStudentProfile', {pendingStudent: result[0]});
	});
});

router.get('/AdminStudentApprovalCon/:id', function(req, res){
	
	studentModel.getByUserId(req.params.id, function(result){
		//console.log(result);
		res.render('AdminStudentApprovalCon', {studentApprove: result[0]});
	});
});

router.post('/AdminStudentApprovalCon/:id', function(req, res){
	console.log(req.params.id);
	studentModel.approveStudent(req.params.id, function(status){
		if(status){
			console.log(status);
			verificationModel.deletePendingStudent(req.params.id, function(status1){
				if(status1){
					console.log(status1);
					res.redirect('/AdminStudentApproval');
				}else{
					res.redirect('/AdminStudentApprovalCon/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminStudentApprovalCon/'+req.params.id);
		}
	});
});

router.get('/AdminStudentDeclineCon/:id', function(req, res){
	
	studentModel.getByUserId(req.params.id, function(result){
		//console.log(result);
		res.render('AdminStudentDeclineCon', {studentDecline: result[0]});
	});
});

router.post('/AdminStudentDeclineCon/:id', function(req, res){
	console.log(req.params.id);
	studentModel.deleteStudent(req.params.id, function(status){
		if(status){
			console.log(status);
			verificationModel.deletePendingStudent(req.params.id, function(status1){
				if(status1){
					userModel.deleteUser(req.params.id, function(status2){
						if(status2){
							console.log(status2);
							res.redirect('/AdminStudentApproval');
						}else{
							res.redirect('/AdminStudentDeclineCon/'+req.params.id);
						}
					});
				}else{
					res.redirect('/AdminStudentDeclineCon/'+req.params.id);
				}
			});
		}else{
			res.redirect('/AdminStudentDeclineCon/'+req.params.id);
		}
	});
});

/*router.get('/upload/student/:id', function(req, res){
	var download = require('download-file')
 
	var url = "http://localhost:1000/AdminStudentApproval/upload/student/1.pdf"
	 
	var options = {
	    directory: "./upload/student/",
	    filename: "1.pdf"
	}
	 
	download(url, options, function(err){
	    if (err){
	    	console.log(err);
	    }
	}) 
	
});*/

router.get('/:file',function(req,res){
	if(req.cookies['username']!=null)
	{
		  var file = req.params.file;
		  var fileLocation = path.join('./upload/student',file);
		  console.log(fileLocation);
		  res.download(fileLocation, file); 
		
	}else{
		res.redirect('/logout');
	}
});


module.exports = router;