var db = require('./db');

module.exports ={
	getById: function(userid, callback){
		var sql = "select * from files where userid=?";
		db.getResult(sql, [userid], function(result){

			if(result.length > 0){
				callback(result);
			}else{
				callback(null);
			}
		});
	},
	getAll:function(callback){
		var sql = "select * from files";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO files (`id`, `userid`, `name`) VALUES (?,?,?)";
		db.execute(sql,['',user.userid,user.file], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	delete: function(user, callback){
		var sql = "delete from files where userid =?";
		db.execute(sql, [user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update files set name=? where userid=?";
		db.execute(sql, [user.file,user.userid],function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}