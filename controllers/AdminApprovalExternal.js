var express 			= require('express');
var router 				= express.Router();
var groupModel   		= require.main.require('./models/group-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/', function(req, res){
	groupModel.getAllPendingExternal(function(results){
		console.log(results);
		if(results.length > 0){
			console.log('External approve list requested!');
    		res.render('AdminApprovalExternal', {externalList: results});
		}else{
			res.render('AdminApprovalExternal', {externalList: []});
		}
	});
})


router.get('/AdminApprovalExternalAppCon/:id', function(req, res){
	
	groupModel.getPendingExternalByID(req.params.id, function(result){
		//console.log(result);
		res.render('AdminApprovalExternalAppCon', {penExternal: result[0]});
	});
});

router.post('/AdminApprovalExternalAppCon/:id', function(req, res){
	console.log(req.params.id);
	groupModel.makeActiveGroup(req.params.id, function(status){
		if(status){
			console.log(status);
			res.redirect('/AdminApprovalExternal');
		}else{
			res.redirect('/AdminApprovalExternalAppCon/'+req.params.id);
		}
	});
});


module.exports = router;