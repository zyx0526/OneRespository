var mysql = require('mysql');
//创建了一个数据库连接池
const pool = mysql.createPool({
    host: 'localhost',
	port: 3306,
    user: 'root',
    password: '123',
    database: 'h51811'
});

exports.pool = pool;

// /**
//  * 1.当连接成功时，err的值为null. 失败时
//  * 2. conn是连接对象
//  */
// pool.getConnection(function(err, conn){
// 	if(err) {//失败
// 		console.log(err);
// 	}else {//连接成功
// 		var sql = "select name from user where loginname=? and pwd = ?";
// 		conn.query(sql,['xm','123'],function(err2, results){
// 			console.log(results);//打印查询结果
// 			conn.release();//释放连接
// 		});
// 	}
// });
//  