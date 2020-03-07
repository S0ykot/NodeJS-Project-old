var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	if(req.cookies['username']!=null)
	{
		console.log('Upload file page requested!');
		res.render('AdminUploadFile');
	}else{
		res.redirect('/logout');
	}
});

module.exports = router;