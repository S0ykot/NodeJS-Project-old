var db = require('./db');

module.exports ={
	getByUserId: function(id, callback){
		var sql = "select * from teachers where userid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updateOwnProfile: function(user, callback){
		var sql = "update teachers set fname=?, lname=?, contact=?, dept=? where userid=?";
		db.execute(sql, [user.fname, user.lname, user.contact, user.dept, user.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	addTeacher: function(user, callback){
		var sql = "insert into teachers values(?,?,?,?,?,?,?,?,?)";
		db.execute(sql, [null, user.userid, user.fname, user.lname, user.email, user.contact, user.dept, user.regDate, user.status], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getAllTeachers:function(callback){
		var sql = "select * from teachers";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getAllActiveTeachers:function(callback){
		var sql = "select * from teachers where status ='active'";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getAllInactiveTeachers:function(callback){
		var sql = "select * from teachers where status ='inactive'";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getById: function(id, callback){
		var sql = "select * from teachers where id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updateTeacher: function(user, callback){
		var sql = "update teachers set userid=?, fname=?, lname=?, email=?, contact=?, dept=? where id=?";
		db.execute(sql, [user.userid, user.fname, user.lname, user.email, user.contact, user.dept, user.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteTeacher: function(id, callback){
		var sql = "delete from teachers where userid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	blockTeacher: function(id, callback){
		var sql = "update teachers set status = 'inactive' where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	unblockTeacher: function(id, callback){
		var sql = "update teachers set status = 'active' where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}