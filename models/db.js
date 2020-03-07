var mysql      	= require('mysql');

var getConnection = function(callback){

	var connection = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'researchProject'
	});
	
	connection.connect(function(err) {
	  if (err) {
	    console.error('error connecting: ' + err.stack);
	    callback(null);
	  }
	  console.log('connected as id ' + connection.threadId);
	});
	callback(connection);
}

module.exports ={
	getResult: function(sql, array, callback){
		getConnection(function(connection){
			if(array==null){
				connection.query(sql, function(error, results){
				if(!error){
					callback(results);
				}else{
					callback(null);
				}
			});
			}else{
				connection.query(sql, array, function(error, results){
					if(!error){
						callback(results);
					}else{
						callback(null);
					}
				});
			}
			connection.end(function(error){
				console.log('connection end!');
			});	
		});
	},
	execute: function(sql, array, callback){
		getConnection(function(connection){
			if(array==null){
				connection.query(sql, function(error, results){
					if(!error){
						callback(true);
					}else{
						callback(false);
					}
				});
			}else{
				connection.query(sql, array, function(error, status){
					if(status){
						callback(true);
					}else{
						callback(false);
					}
				});
			}
			connection.end(function(error){
				console.log('connection end!');
			});	
		});
	}
}

