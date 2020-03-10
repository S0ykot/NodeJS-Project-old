var db = require('./db');



module.exports = {
	loginValidate: function(user, callback){
		var sql = "select * from login where userid='"+user.username+"' and password='"+user.password+"' and role='teacher'";
		db.getResult(sql, function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getById : function(id, callback){
		var sql = "select * from teachers where userid='"+id+"'";
		db.getResult(sql, function(result){
				callback(result[0]);
		});
	},
	getTeacherName: function(data, callback){
		var sql = "select fname,lname from teachers where userid='"+data+"'";
		db.getResult(sql, function(result){
				callback(result);
		});
	},
	addTopic : function(data,callback){
		var sql = "insert into topic values (null,'"+data.topicName+"','"+data.desc+"','"+data.domain+"','"+data.supervisor+"','"+data.type+"','"+data.userid+"')";
		console.log(sql);
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	},
	
	allTopic : function(data, callback){
		var sql = "select * from topic where userid='"+data+"'";
		db.getResult(sql, function(result){
				callback(result);
		});
	},

	inactiveStudent : function(data,callback) {
		var sql = "Select * from students where status='inactive'";
		db.getResult(sql, function(result){
				callback(result);		
		});
	},

	passwordMatch : function(id,callback) {
		var sql = "Select password from login where userid='"+id+"'";
		db.getResult(sql, function(result){
				callback(result[0]);		
		});
	},

	updatePassword : function(data,callback){
		var sql = "UPDATE login SET password='"+data.newPass+"' where userid='"+data.userid+"' and role='teacher'";
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	},
	getDomain : function(data,callback) {
		var sql = "select * from domain";
		db.getResult(sql, function(result){
				callback(result);		
		});
	},
	groupStudent : function(data,callback) {
		var sql = "select * from domain";
		db.getResult(sql, function(result){
				callback(result);		
		});
	},
	updateProfile : function(data,callback) {
		var sql = "UPDATE teachers SET fname='"+data.fname+"',lname='"+data.lname+"',email='"+data.email+"',contact='"+data.contact+"' where userid='"+data.userid+"'";
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	},
	approveStudent : function(id,callback) {
		var sql = "UPDATE students SET status='active' where id="+id;
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	},
	regStudent : function(data,callback){
		var sql = "insert into students values (null,'"+data.userid+"','"+data.fname+"','"+data.lname+"','"+data.email+"','"+data.contact+"','"+data.dept+"','"+data.credit+"','"+data.cgpa+"','"+data.regDate+"','active')";
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		});
	},
	searchStudent : function (key,callback) {
		var sql = "select * from students where userid like '%"+key+"%' or fname like '%"+key+"%' or lname like '%"+key+"%' or contact like '%"+key+"%' or dept like '%"+key+"%'";
		db.getResult(sql, function(result){
				callback(result);		
		});
	},
	allStudent : function (key,callback) {
		var sql = "select * from students";
		db.getResult(sql, function(result){
				callback(result);		
		});
	},
	inactiveStudentSearch : function(key,callback) {
		var sql = "Select * from students where status='inactive' and userid like '%"+key+"%'";
		db.getResult(sql, function(result){
				callback(result);	
		});
	},
	uploadFile : function(data,callback){
		var sql = "insert into files values (null,'"+data.userid+"','"+data.name+"')";
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		})
	},
	leaveTopic: function(data,callback){
		var sql = "update topic set userid='',supervisor='' where tid="+data;
		db.execute(sql,function(status) {
			if (status) {
				callback(true);
			}
			else
			{
				callback(false);
			}
		})
	},
}

