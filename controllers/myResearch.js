var express = require('express');
var router = express.Router();
const model_topic= require.main.require('./models/model_topic');
const model_group= require.main.require('./models/model_group');
const model_user= require.main.require('./models/model_user');


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
		model_group.getById(req.cookies['username'],function(result){
			if(result!=null){
				model_topic.getById(result[0].tid,function(results){
					var data={
						name: req.cookies['username'],
						result:result,
						results:results
						}
						console.log('myResearch page requested!');
					
						res.render('myResearch/index',data);
				});
			}else{
				var data={
					name: req.cookies['username'],
					result:result
					}
					console.log('myResearch page requested!');
				
					res.render('myResearch/index',data);
			}
			console.log(result);
		})
		
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