var express 					  = require('express');
var router 						  = express.Router();
var teacherModel   				  = require.main.require('./models/teacher-model');
var domainModel   				  = require.main.require('./models/domain-model');
var topicModel   				  = require.main.require('./models/topic-model');
var typeModel   				  = require.main.require('./models/type-model');
const { check, validationResult } = require('express-validator/check');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', [
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('supervisor', 'Supervisor name is required').isEmpty(),
  check('type', 'Type is required').isEmpty(),
  ] , function(req, res){
  	console.log('Topic Offer requested!');
  	var errors = validationResult(req);
	domainModel.getAllDomains(function(domainResults){
		if(domainResults.length > 0){
			teacherModel.getAllTeachers(function(teacherResults){
				if(teacherResults.length > 0){
					//console.log(domainResults);
					//console.log(teacherResults);
		    		typeModel.getAllResearchType(function(typeResults){
						if(typeResults.length > 0){
							//console.log(domainResults);
							//console.log(teacherResults);
				    		res.render('AdminOfferTopic', {domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
						}else{
							res.render('AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
						}
					});
				}else{
					res.render('AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
				}
			});
		}else{
			res.render('AdminOfferTopic', {domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
		}
	});
})







router.post('/', [
  check('name', 'Topic name is required').not().isEmpty(),
  check('description', 'Description is required').not().isEmpty(),
  check('domain', 'Domain name is required').not().isEmpty(),
  check('supervisor', 'Supervisor name is required').not().isEmpty(),
  check('type', 'Type is required').not().isEmpty(),
  ], function(req, res){
	

	var topic = {
		name: req.body.name,
		description: req.body.description,
		domain: req.body.domain,
		supervisor: req.body.supervisor,
		type: req.body.type,
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.mapped());
    	res.render('AdminOfferTopic', {error:errors.mapped()});	
    }else{
		topicModel.addTopic(topic, function(status){
		console.log(status);
		if (status) {
			res.redirect('/AdminTopicDetails');
		}else{
			res.redirect('/AdminOfferTopic');
		}
				
		});
	}
});


module.exports = router;