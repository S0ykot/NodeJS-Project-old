var db = require('./db');

module.exports ={
	
	getAllTopics:function(callback){
		var sql = "select * from topic";
		db.getResult(sql, null, function(results){
			if(results.length > 0){
				callback(results);
			}else{
				callback(null);
			}
		});
	},

	getById: function(id, callback){
		var sql = "select * from topic where tid=?";
		db.getResult(sql, [id], function(result){
			if(result){
				callback(result);
			}else{
				callback(null);
			}
		});
	},

	addTopic: function(topic, callback){
		var sql = "insert into topic values(?,?,?,?,?,?)";
		db.execute(sql, [null, topic.name, topic.description, topic.domain, topic.supervisor, topic.type], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	deleteTopic: function(id, callback){
		var sql = "delete from topic where tid=?";
		db.execute(sql, [id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

	updateTopic: function(topic, callback){
		var sql = "update topic set name=?, description=?, domain=?, supervisor=?, type=? where tid=?";
		db.execute(sql, [topic.name, topic.description, topic.domain, topic.supervisor, topic.type, topic.id], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}