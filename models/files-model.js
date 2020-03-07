var db = require('./db');

module.exports ={
	
	addFile: function(file, callback){
		var sql = "insert into files values(?,?,?)";
		db.execute(sql, [null, file.userid, file.name], function(status){
			if(status){
				callback(true);
			}else{
				callback(false);
			}
		});
	},

}