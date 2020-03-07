var db = require('./db');

module.exports ={
	
	getAllDomains:function(callback){
		var sql = "select * from domain";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from domain where id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	addDoamin: function(domain, callback){
		var sql = "insert into domain values(?,?)";
		db.execute(sql, [null, domain.name], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateDomain: function(domain, callback){
		var sql = "update domain set name=? where id=?";
		db.execute(sql, [domain.name, domain.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteDomain: function(id, callback){
		var sql = "delete from domain where id=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},
}