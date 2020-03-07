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


module.exports = router;