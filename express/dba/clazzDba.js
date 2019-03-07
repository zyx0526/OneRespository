const dbutils = require("../utils/dbutils.js");

//查出所有的班级信息
function selectAllClazz(cb) {
	dbutils.pool.getConnection(function(err, conn){
		const sql = "select id, name, major from clazz";
		conn.query(sql, [], function(err, clazzes){
			cb(clazzes);
			conn.release();
		})
	});
}
//根据id删除班级
function deleteById(id, cb) {
	dbutils.pool.getConnection(function(err,conn){
		const sql = "delete from clazz where id=?";
		conn.query(sql, [id], function(err, result){
			cb(result.affectedRows);
			conn.release();
		});
	})
}

//根据名字统计
function countByName(name, cb) {
	dbutils.pool.getConnection(function(err,conn){
		const sql = "select count(*) as num from clazz where name=?";
		conn.query(sql, [name], function(err, result){
			cb(result);//[num:1], [num:0]
			conn.release();
		});
	})
}
//增加一个班级
function addClazz(name, major, cb) {
	dbutils.pool.getConnection(function(err1, conn){
		const sql = "insert into clazz(name, major)values(?,?)";
		conn.query(sql,[name,major], function(err2, result){
			console.log("err2",err2);
// 			cb(result);
			if(err2 != null) {//没有保存成功
				cb(false);//false
			}else {//保存成功
				cb(result.affectedRows);//1
			}
			conn.release();
		});
	});
}
//修改班级
function updateClazz(id, name, major, cb) {
	dbutils.pool.getConnection(function(err1, conn){
		const sql = "update clazz set name=?, major=? where id=?";
		conn.query(sql, [name,major, id], function(err2, result){
			if(err2==null) {//修改成功
				cb(result.affectedRows);//1
			}else {//修改失败
				cb(false);//false
			}
		})
	});
}
 
exports.updateClazz=updateClazz;
exports.addClazz=addClazz;
exports.countByName=countByName;
exports.deleteById=deleteById;
exports.selectAllClazz=selectAllClazz;


