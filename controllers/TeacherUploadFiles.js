var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var userModel = require.main.require('./models/teacher-model');

router.get('*', function(req, res, next){
	if(req.cookies['token'] == null){
		res.redirect('/login');
	}else{
		next();
	}
});


router.get('/',function(req,res){
	res.render('TeacherUploadFiles',{name:req.cookies['username']});
});


const storage = multer.diskStorage({
  destination: './upload/teacher/',
  filename: function(req, file, cb){
    cb(null,path.basename(file.originalname,path.extname(file.originalname)) + '__' + req.cookies['username'] + '__'+ path.extname(file.originalname));
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
  // Allowed ext
  const filetypes = /pdf|doc|docs/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: PDF, DOC & DOCS File Only!');
  }
}



router.post('/', function(req,res){
  upload(req, res, function(err){
    if(err){
      res.render('TeacherUploadFiles', {
        msg: err, name:req.cookies['username']
      });
    } else {
      if(req.file == undefined){
        res.render('TeacherUploadFiles', {
          msg: 'Error: No File Selected!',
          name :req.cookies['username']
        });
      } else {
      	var fileDB ={
        	userid: req.cookies['username'],
        	name: req.file.filename
        }
        userModel.uploadFile(fileDB, function(status){
		console.log(status);
			if (status) {
				res.render('TeacherUploadFiles', {
          			msg: 'File Uploaded!',
          			file: 'upload/teacher/${req.file.filename}',
          			name :req.cookies['username']
        	});
			}else{
				res.render('TeacherUploadFiles', {
          			msg: 'File Not Uploaded!',
          			name :req.cookies['username']
        	});
			}
		});
      }
    }
  });
});


module.exports = router;