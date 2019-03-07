const dbutils = require("../utils/dbutils.js");


//根据name和pwd查询name;
function selectByNameAndPwd(name, pwd, cb) {
	dbutils.pool.getConnection(function(err, conn){
		const sql = "select name from admin where name=? and pwd =?";
		conn.query(sql, [name, pwd], function(err, result){
			cb(result);
		})
	});
}
exports.selectByNameAndPwd=selectByNameAndPwd;


