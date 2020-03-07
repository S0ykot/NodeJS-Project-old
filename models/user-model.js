var db = require('./db');

module.exports ={
	validate: function(user, callback){
		var sql = "select * from login where userid=? and password=? and role ='admin'";
		db.getResult(sql, [user.userid, user.password], function(result){
			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	updatePassword: function(user, callback){
		var sql = "update login set password=? where userid=?";
		db.execute(sql, [user.newpass, user.userid], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	addUser: function(user, callback){
		var sql = "insert into login values(?,?,?,?)";
		db.execute(sql, [null, user.userid, user.password, user.role], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteUser: function(id, callback){
		var sql = "delete from login where userid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}