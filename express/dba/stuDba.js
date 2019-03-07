const dbutils = require("../utils/dbutils.js");

//根据clazzId查出学生
function selectStuByClazzId(clazzId, cb) {
	dbutils.pool.getConnection(function(err, conn){
		// id | loginname | pwd | name | birthday            | clazzid 
		const sql = "select id, loginname, pwd, name, birthday, clazzid from stu where clazzId=?";
		conn.query(sql, [clazzId], function(err, stues){
			conn.release();
			cb(stues); //[{},{}]
		})
	});
}

//根据id删除学生
function delStuById(id, cb) {
	dbutils.pool.getConnection(function(err, conn){
		const sql = "delete from stu where id=?";
		conn.query(sql, [id], function(err, result){
			conn.release();
			if(err==null) {
				cb(result.affectedRows);//1
			}else {
				cb(false);//false
			}
			
		})
	})
}
//增加学生
function addStu(clazzid, loginname, pwd, name, birthday, cb) {
	dbutils.pool.getConnection(function(err, conn){
		const sql = "insert into stu(loginname, pwd, name, birthday, clazzid)values(?,?,?,?,?)";
		conn.query(sql, [loginname, pwd, name, birthday, clazzid], function(err, result){
			conn.release();
			if(err==null) {//成功
				cb(result.affectedRows);//1
			}else {//失败
				cb(false);//false
			}
		})
	})
}

// addStu(76, "wgrr1","123", "周星星", new Date(2008, 1, 22), function(inf){
// 	console.log(inf);
// })
// addStu(76, "wgrr2","123", "周星星", "2008:2:22", function(inf){
// 	console.log(inf);
// })
exports.addStu=addStu;
exports.delStuById=delStuById;
exports.selectStuByClazzId=selectStuByClazzId;
