const  adminDba= require("../dba/adminDba.js");

//管理员登陆
function login(name, pwd, cb) {
	adminDba.selectByNameAndPwd(name, pwd, function(result){
		//result：1:[] ;   2: [{name:'tuyy'}]
		if(result.length==0) {//登陆失败
			cb(null);
		}else {//登陆成功
			cb(result[0].name);
		}
	});
}

exports.login=login;
 