var express = require('express');
var router = express.Router();
var teacherModel   = require.main.require('./models/teacher-model');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('fname', 'First Name is required').isEmpty(),
  check('lname', 'Last Name is required').isEmpty(),
  check('contact', 'Contact No is required').isEmpty(),
  check('dept', 'Department Name is required').isEmpty(),
  check('email', 'Email is required').isEmpty(),
  check('userid', 'Userid is required').isEmpty(),
  check('regDate', 'Userid is required').isEmpty(),
  check('status', 'Userid is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
 	console.log('Admin profile requested!');
 	teacherModel.getByUserId(req.cookies['username'], function(result){
	res.render('AdminProfile', {user: result[0], error:errors.mapped()});
	});
 });


router.post('/', [
  check('fname', 'First Name is required').not().isEmpty(),
  check('lname', 'Last Name is required').not().isEmpty(),
  check('contact', 'Contact No is required').not().isEmpty(),
  check('dept', 'Department Name is required').not().isEmpty(),
  check('email', 'Email is required').not().isEmpty(),
  check('userid', 'Userid is required').not().isEmpty(),
  check('regDate', 'Userid is required').not().isEmpty(),
  check('status', 'Userid is required').not().isEmpty()
  ], function(req, res){
	
	var user = {
		fname: req.body.fname,
		lname: req.body.lname,
		contact: req.body.contact,
		dept: req.body.dept,
		regDate: req.body.regDate,
		userid: req.body.userid
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	//console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var users = matchedData(req);
    	console.log(users);
    	teacherModel.getByUserId(req.cookies['username'], function(result){
			res.render('AdminProfile', {user: users, error:errors.mapped()});
		});
    }else{
		teacherModel.updateOwnProfile(user, function(status){
		//console.log(status);
		res.redirect('/AdminProfile');		
		});
	}
});


module.exports = router;