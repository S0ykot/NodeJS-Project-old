const express = require('express');
const router = express.Router();


router.get('/',function(req,res){
	res.clearCookie('username');
	res.clearCookie('token');
	res.redirect('/login');
});

module.exports = router;