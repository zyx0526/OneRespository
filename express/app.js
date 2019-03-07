const express = require("express");
const ejs = require('ejs');
const app = express();
//设置ejs
app.set('view engine','html');
app.engine('.html', require('ejs').__express);
//设置视图
app.set('views', __dirname+"/views");
//设置静态资源
app.use(express.static(__dirname+"/public"));
//设置处理post请求参数
const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:false}));
//cookie
var cookieParser = require('cookie-parser');  
app.use(cookieParser());  

//导入adminService.js
const adminService = require("./service/adminService.js");
//导入clazzService.js
const clazzService = require("./service/clazzService.js");
//导入stuService.js
const stuService = require("./service/stuService.js");


//进入clazz.html
app.get("/clazz", function(req, res){
	var obj = req.cookies; 
    if("name" in obj) {
		res.render("clazz");
	}else {
		res.render("login",{inf:'请先登陆'});
	}
});

//登陆
app.post("/login.do", function(req, res){
	var name = req.body.name;
	var pwd = req.body.pwd;
	adminService.login(name, pwd, function(name){
		if(name!=null) {//登陆成功
			res.cookie("name", name, {})
			res.render("clazz");
		}else {//登陆失败
			res.render("login",{inf:'用户名或密码错误'});
		}
	})
})

//显示所有的班级
app.post("/showClazz", function(req, res){
	clazzService.getAllClazz(function(clazzes){
		res.json(clazzes);
	})
})
//根据id删除班级
app.get("/deleteById", function(req, res){
	var clazzId = req.query.clazzId;
	clazzService.deleteById(clazzId, function(affectRows){
		if(affectRows==1) {//删除成功
			res.json(true);
		}else {//删除失败
			res.json(false);
		}
	})
})
 
app.get("/checkName", function(req, res){
	var name = req.query.name;
	clazzService.checkName(name, function(flag){
		if(flag) {//重复
			res.json(true);
		}else {//没有重复
			res.json(false);
		}
	})
})
 
//增加一个班级
app.post("/addClazz", function(req, res){
	var name = req.body.name;
	var major = req.body.major;
	clazzService.addClazz(name, major, function(inf){
		res.json(inf);//成功返回1, 否则返回false
	})
})
 
//修改一个班级
app.post("/updateClazz", function(req, res){
	var id = req.body.clazzId;
	var name = req.body.clazzName;
	var major = req.body.clazzMajor;
	clazzService.updateClazz(id, name, major, function(inf){
		res.json(inf);//成功返回1, 否则返回false
	})
});

//进入学生管理界面
 app.get("/stu", function(req, res){
	 var clazzId = req.query.clazzId;
	 var clazzName = req.query.clazzName;
	 res.render("stu",{clazz:{clazzId:clazzId, clazzName:clazzName}});
 })
 
 //ajax显示所有学生
 app.post("/showStu", function(req, res){
	 var clazzId = req.body.clazzId;
	 stuService.getAllStuByClazzId(clazzId, function(stues){
		 //id, loginname, pwd, name, birthday, clazzid
		//[{id:1, loginname:'007', pwd:'123',name:'小明', birthday:'2017:23:23 22:2:2',clazzid:76},{....}] 
		res.json(stues);
	 });
 })
 //根据id删除学生
 app.post("/delStuById", function(req, res){
	 var id = req.body.stuId;
	 stuService.delStuById(id, function(inf){
		 res.json(inf);//1, false
	 })
 })
//增加学生
app.post("/addStu", function(req, res){
	var classid = req.body.clazzid;
	var loginname = req.body.loginname;
	var pwd = req.body.pwd;
	var name = req.body.name;
	var birthday = req.body.birthday;
	stuService.addStu(classid, loginname, pwd, name, birthday, function(inf){
		res.json(inf);//1, false;
	})
});
 
app.listen(9999, function() {
	console.log("服务器正在监听中");
});
