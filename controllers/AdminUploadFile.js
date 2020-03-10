var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');

var fileModel   = require.main.require('./models/files-model');

router.get('*', function(req, res, next){
	if(req.cookies['username'] == null){
		res.redirect('/');
	}else{
		next();
	}
});


router.get('/',function(req,res){
	console.log('Upload file page requested!');
	res.render('AdminUploadFile');
});


var today = new Date();
var sysDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
//var sysTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();


const storage = multer.diskStorage({
  destination: './upload/admin/',
  filename: function(req, file, cb){
    cb(null,path.basename(file.originalname,path.extname(file.originalname)) + '__' + req.cookies['username'] + '__' + sysDate + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 5767168},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('file');

function checkFileType(file, cb){
  
  const filetypes = /pdf|doc|docs/;
  
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
  const mimetype = filetypes.test(file.mimetype);
  //console.log(file.mimetype);
  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF, DOC & DOCS File Only!');
  }
}

router.post('/', function(req,res){
  upload(req, res, function(err){
    if(err){
      res.render('AdminUploadFile', {
        msg: err
      });
    } else {
      if(req.file == undefined){
        res.render('AdminUploadFile', {
          msg: 'Error: No File Selected!'
        });
      } else {
      	var fileDB ={
        	userid: req.cookies['username'],
        	name: req.file.filename
        }
        fileModel.addFile(fileDB, function(status){
		console.log(status);
			if (status) {
				res.render('AdminUploadFile', {
          			msg: 'File Uploaded!',
          			file: 'upload/admin/${req.file.filename}'
        	});
			}else{
				res.render('AdminUploadFile', {
          			msg: 'File Not Uploaded!',
        	});
			}
		});
        //console.log(req.file.filename);
      }
    }
  });
});

module.exports = router;