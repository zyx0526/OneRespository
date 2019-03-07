一、数据库
数据库登陆信息:
服务器电脑localhost
数据库端口3306
数据库名h51811
用户名 root
密码123
二、数据库中的表
admin: id, name, pwd
clazz: id, name, major
stu:   id, loginname, pwd, name, birthday, clazzid

DROP TABLE IF EXISTS admin;
CREATE TABLE admin (
  id int PRIMARY KEY AUTO_INCREMENT,
  name char(20) NOT NULL UNIQUE,
  pwd char(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS clazz;
CREATE TABLE clazz (
  id int PRIMARY KEY AUTO_INCREMENT,
  name char(20) NOT NULL UNIQUE,
  major char(30)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS stu;
CREATE TABLE stu (
  id int PRIMARY KEY AUTO_INCREMENT,
  loginname char(20) NOT NULL UNIQUE,
  pwd char(6) not null,
  name char(20),
  birthday datetime,
  clazzid int
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

三、


