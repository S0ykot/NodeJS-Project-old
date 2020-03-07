const express = require('express');
const router = express.Router();


router.get('/',function(req,res){
	//req.session.username = null;
	res.clearCookie('username');
	res.redirect('/login');
});

module.exports = router;