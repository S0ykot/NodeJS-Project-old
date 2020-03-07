var express = require('express');
var router = express.Router();
var domainModel   = require.main.require('./models/domain-model');
const { check, validationResult } = require('express-validator/check');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Doamin name is required').isEmpty()
  ] ,function(req,res){
  	var errors = validationResult(req);
    console.log('Domain add requested!');
    res.render('AdminDomainAdd',{error:errors.mapped()});
  
});

router.post('/', [
  check('name', 'Doamin name is required').not().isEmpty()
  ], function(req, res){
	

	var domain = {
		name: req.body.name,
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('AdminDomainAdd', {error:errors.mapped()});	
    }else{
		domainModel.addDoamin(domain, function(status){
		console.log(status);
		if (status) {
			res.redirect('/AdminDomainDetails');
		}else{
			res.redirect('/AdminDomainAdd');
		}
				
		});
	}
});

module.exports = router;