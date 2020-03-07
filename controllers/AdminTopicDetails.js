var express 						= require('express');
var router 							= express.Router();
var teacherModel   					= require.main.require('./models/teacher-model');
var topicModel   					= require.main.require('./models/topic-model');
var domainModel   				  = require.main.require('./models/domain-model');
var typeModel   				  = require.main.require('./models/type-model');
const { check, validationResult } 	= require('express-validator/check');
const { matchedData, sanitizeBody } = require('express-validator/filter');


router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	topicModel.getAllTopics(function(results){
		if(results.length > 0){
			console.log('Topic list requested!');
    		res.render('AdminTopicDetails', {topiclist: results});
		}else{
			res.send('Null Value');
		}
	});
})

/*router.get('/AdminTopicUpdate/:id',[
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('supervisor', 'Supervisor name is required').isEmpty(),
  check('type', 'Type is required').isEmpty(),
  ] , function(req, res){
	var errors = validationResult(req);
	topicModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('AdminTopicUpdate', {topic: result[0], error:errors.mapped()});
	});
});*/


router.get('/AdminTopicUpdate/:id', [
  check('name', 'Topic name is required').isEmpty(),
  check('description', 'Description is required').isEmpty(),
  check('domain', 'Domain name is required').isEmpty(),
  check('type', 'Type is required').isEmpty()
  ] , function(req, res){
  	console.log('Topic Update requested!');
  	var errors = validationResult(req);
	domainModel.getAllDomains(function(domainResults){
		if(domainResults.length > 0){
			teacherModel.getAllTeachers(function(teacherResults){
				if(teacherResults.length > 0){
					//console.log(domainResults);
					//console.log(teacherResults);
		    		//res.render('AdminOfferTopic', {domainlist: domainResults,teacherlist: teacherResults,error:errors.mapped()});
		    		typeModel.getAllResearchType(function(typeResults){
						if(typeResults.length > 0){
							
				    		topicModel.getById(req.params.id, function(topicresult){

								res.render('AdminTopicUpdate', {topic: topicresult[0],domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
							});
						}else{
							res.render('AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
						}
					});
				}else{
					res.render('AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});
				}
			});
		}else{
			res.render('AdminTopicUpdate', {topic: topicresult[0],domainlist: [],typelist: [],teacherlist: [],error:errors.mapped()});

		}
	});
})

router.post('/AdminTopicUpdate/:id', [
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
		id: req.params.id
	};

	var errors = validationResult(req);
	if (!errors.isEmpty()) {
    	//console.log(errors.mapped());
    	//var allErrors = errors.mapped();
    	//console.log(allErrors);
    	var topics = matchedData(req);
    	console.log(topics);
    	topicModel.getById(req.params.id, function(topicresult){

			res.render('AdminTopicUpdate', {topic: topics,domainlist: domainResults,typelist: typeResults,teacherlist: teacherResults,error:errors.mapped()});
		});
    }else{
		topicModel.updateTopic(topic, function(status){
			console.log(status);
			if (status) {
				res.redirect('/AdminTopicDetails');
			}else{
				res.redirect('/AdminTopicDetails/AdminTopicUpdate/'+req.params.id);
			}	
		});
	}
});


router.get('/AdminTopicDelete/:id', function(req, res){
	
	topicModel.getById(req.params.id, function(result){
		console.log(result);
		res.render('AdminTopicDelete', {topicDel: result[0]});
	});
});

router.post('/AdminTopicDelete/:id', function(req, res){
	
	console.log(req.params.id);
	topicModel.deleteTopic(req.params.id, function(status){
		if(status){
			console.log(status);
			res.redirect('/AdminTopicDetails');
		}else{
			res.redirect('/AdminTopicDelete/'+req.params.id);
		}
	});
});

module.exports = router;	