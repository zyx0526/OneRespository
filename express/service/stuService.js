const stuDba = require("../dba/stuDba.js");

//根据班级id得到该班级的所有学生
function getAllStuByClazzId(clazzId, cb) {
	stuDba.selectStuByClazzId(clazzId, function(stues){
		cb(stues);
	})
}
//根据id删除学生,成功返回1, 失败返回false
function delStuById(id, cb) {
	stuDba.delStuById(id, function(inf){
		cb(inf);//1, false
	})
}
//增加学生, 成功返回1, 失败返回false
function addStu(clazzid, loginname, pwd, name,birthday, cb) {
	stuDba.addStu(clazzid, loginname, pwd,name, birthday, function(inf){
		cb(inf);
	})
}
exports.addStu=addStu;
exports.delStuById=delStuById;
exports.getAllStuByClazzId=getAllStuByClazzId;
 
