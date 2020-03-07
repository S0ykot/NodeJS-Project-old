var db = require('./db');

module.exports ={
	
	getAllGroupsNumbers:function(callback){
		var sql = "select distinct group_id from research_group";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	allocateExternal: function(allocation, callback){
		var sql = "update research_group set external=?, status='active'where group_id=?";
		db.execute(sql, [allocation.external, allocation.group_id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	getAllPendingExternal:function(callback){
		var sql = "SELECT DISTINCT(research_group.group_id), topic.name, topic.supervisor,research_group.external,research_group.status FROM research_group,topic where research_group.tid=topic.tid and research_group.status='inactive'";
		db.getResult(sql, null, function(results){
			
			callback(results);
		});
	},

	
}