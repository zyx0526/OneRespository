const  clazzDba= require("../dba/clazzDba.js");

//得到所有的班级
function getAllClazz(cb) {
	clazzDba.selectAllClazz(function(clazzes){
		cb(clazzes);
	});
}
//根据id删除班级
function deleteById(id, cb) {
	clazzDba.deleteById(id,function(affectedRows){
		cb(affectedRows);
	})
}
//判断班级名字是否重复,重复返回true, 否则返回false
function checkName(name, cb) {
	clazzDba.countByName(name, function(result) {
		if(result[0].num==0) {//没有重复
			cb(false);
		}else {//重复
			cb(true);
		}
	})
}
//增加一个班级, 成功返回1, 否则返回false
function addClazz(name, major, cb) {
	clazzDba.addClazz(name, major, function(inf){
		cb(inf);//false,  1
	});
}
//修改一个班级,成功返回1, 否则返回false
function updateClazz(id, name, major, cb) {
	clazzDba.updateClazz(id, name, major, function(inf){
		cb(inf);//false, 1
	})
}

exports.updateClazz=updateClazz;
exports.addClazz=addClazz;
exports.checkName=checkName;
exports.getAllClazz=getAllClazz;
exports.deleteById=deleteById;