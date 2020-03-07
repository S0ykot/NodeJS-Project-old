var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from students where userid=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from students where userid=? and password=?";
		db.getResult(sql, [user.userid,user.userid], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from students";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO students (`id`, `userid`, `fname`, `lname`, `email`, `contact`, `dept`,`credit`, `cgpa`, `regDate`, `status`) VALUES (?,?,?,?,?,?,?,?,?,?,?)";
		db.execute(sql,['',user.userid,user.fname,user.lname,user.email,user.contact,user.dept,user.credit,user.cgpa,user.regDate,user.status], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from user values";
		db.execute(sql, [],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update students set fname=?, lname=?, contact=?, dept=?, cgpa=?, credit=? where userid=?";
		db.execute(sql, [user.fname,user.lname,user.contact,user.dept,user.cgpa,user.credit,user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}