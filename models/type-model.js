var db = require('./db');

module.exports ={
	
	getAllResearchType:function(callback){
		var sql = "select * from research_type";
		db.getResult(sql, null, function(results){
			callback(results);
		});
	},

	getById: function(id, callback){
		var sql = "select * from research_type where id=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

}