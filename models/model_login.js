var db = require('./db');

module.exports ={
		getById: function(userid, callback){
		var sql = "select * from login where userid=?";
		db.getResult(sql,[userid], function(result){

			if(result.length > 0){
				callback(result[0]);
			}else{
				callback(null);
			}
		});
	},
	validate: function(user, callback){
		var sql = "select * from login where userid=? and password=?";
		db.getResult(sql, [user.userid,user.password], function(result){
			if(result.length > 0){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	insert: function(user, callback){
		var sql = "INSERT INTO login (`id`, `userid`, `password`) VALUES (?,?,?)";
		db.execute(sql,[null,user.userid,'1234'], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
	update: function(user, callback){
		var sql = "update login set password=?";
		db.execute(sql,[user.newPass], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	}
}