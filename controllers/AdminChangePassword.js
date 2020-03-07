var express = require('express');
var router = express.Router();
var userModel   = require.main.require('./models/user-model');
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
  check('oldpass', 'Current Password is required').isEmpty(),
  check('newpass', 'New Password is required').isEmpty(),
  check('cnewpass', 'Confirm New Password is required').isEmpty() 
  ],function(req,res){
  	var errors = validationResult(req);
    console.log('Change password requested!');
    res.render('AdminChangePassword',{error:errors.mapped()});
});

router.post('/', [
  check('oldpass', 'Current Password is required').not().isEmpty(),
  check('newpass', 'New Password is required').not().isEmpty(),
  check('cnewpass', 'Confirm New Password is required').not().isEmpty()
  ], function(req, res){
	
	var data = {
		oldpass: req.body.oldpass,
		newpass: req.body.newpass,
		cnewpass: req.body.cnewpass,
		userid: req.cookies['username']
		};

	var errors = validationResult(req);
	if (!errors.isEmpty() || req.body.newpass != req.body.cnewpass || req.body.oldpass != req.cookies['password']) {
    	console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	
		res.render('AdminChangePassword', {error:errors.mapped()});
	
    }else{
		userModel.updatePassword(data, function(status){
		//console.log(status);
		res.redirect('/logout');		
		});
	}
});

module.exports = router;