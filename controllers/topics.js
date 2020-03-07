var express = require('express');
var router = express.Router();
const model_topic= require.main.require('./models/model_topic');

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		model_topic.getAll(function(results){
		res.render('topics/index',{name:req.cookies['username'], user:results});
		console.log(results);
		});
		console.log('topic page requested!');
		
		
	}else{
		res.redirect('/logout');
	}
});

router.get('/topicDetails/:id',function(req,res){
	if(req.cookies['username']!=null)
	{
		model_topic.getById(req.params.id,function(results){
		res.render('topics/topicDetails',{name:req.cookies['username'], user:results});
		console.log(results);
		});
		console.log('topic page requested!');
		
		
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