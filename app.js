const express = require('express')
const app = express()
const mysql = require('mysql');  


var connection = mysql.createConnection({
	port:3306,
	host:'localhost',
	user:'root',
	password:'humzas',
	database:'simpleschoolsystem'
});

//  (2) yahan par line activate kiya. so you can make and receive call anytime. next- jab query karenge tab actual call hoga
// activate karne ke time pe checking ho rahi hai ke agar koi error aae to error mgs dena

connection.connect(function(err){
	if(err){
		console.error('error connecting: ' + err.stack);
		return;
	}
	console.log('connected as id ' + connection.threadId);
});


// ====================================================================
// (3) Make routes. Pehle humne connection banaya, ab route ban rahe hai
// this-  jab query karenge tab actual call hoga
// ====================================================================

//(1) pehli default route
app.get('/', (req, res) => res.send('786!BIS'))

// ======================================================
// 	SEARCH PAGE
// 1) For teacher
	app.get('/api/search/teacher', function(req,res){
		var searchvar = req.query.searchvar;
		console.log('searchvar:' + searchvar);
			
		var qry = 'select * from teachers where tname like "%' + searchvar + '%"'
		connection.query(qry,[],function(err, result){
			
			console.log('err' + err);
			// result = {
			// 	teacherId:'1',
			// 	tname:'ali'
			// }
			// console.log(result);
			res.send(result);
		});
	})

// ----------------------------------------------------------
// 2  /api/search/student
	app.get('/api/search/student', function(req,res){
	var searchvar = req.query.searchvar;
	console.log('searchvar: ' + searchvar);

	var qry = 'select * from students where firstname like "%' + searchvar + '%"'
	connection.query(qry,[],function(err,result){
		console.log('err' + err);
		// 	result = {
		// 	studentId:'1',
		// 	sname:'samia'
		// }
		console.log(result);
		res.send(result);
		});
	})


// // 3	/api/search/parent               WITH QUERY
app.get('/api/search/parent', function(req,res){
	var searchvar = req.query.searchvar;
	console.log('searchvar: ' + searchvar);

	var qry = 'select * from parents where pname like "%' + searchvar + '%"'
	connection.query(qry,[],function(err, result){
		console.log('err' + err);
		res.send(result);
	});
})
//--------------------         WITH PARAMS
// app.get('/api/search/parent/:searchvar', function(req,res){
// 	var searchvar = decodeURI(req.params('searchvar'));
// 	console.log('searchvar: ' + searchvar);

// 	var qry = 'select * from parents where pname like "%' + searchvar + '%"'
// 	connection.query(qry,[],function(err, result){
// 		console.log('err' + err);
// 		res.send(result);
// 	});
// })
//--------------------

// TEACHERS PAGE  
// 4	/api/teacher/:teacherid/personalInfo 
	app.get('/api/teacher/:teacherid/personalInfo', function(req,res){
		var teacherId = req.params.teacherid;
		console.log('teacherId: ' + teacherId);

		var sql = 'select * from teachers where tid =  ' +  teacherId

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})

// ----------------------
// 5	/api/teacher/:teacherId/students
	app.get('/api/teacher/:teacherId/students', function(req,res){
		var teacherId = req.params.teacherId;
		console.log('teacherId: ' + teacherId);

		// var sql = 'select * from teachers where Tid =  ' +  teacherId
		var sql = 
			'SELECT students.firstname, students.lastname ' + 
			'FROM students ' +
			'JOIN teacherstudents ON students.sid = teacherstudents.sid ' +
			'JOIN teachers ON teacherstudents.tid = teachers.tid ' +
			'Where teachers.tid = ' + teacherId;

			console.log (sql);

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})

// -------------------------------------------
// 6	/api/teacher/:teacherId/attendance
	app.get ('/api/teacher/:teacherId/attendance', function(req,res){
		var teacherId = req.params.teacherId;
		console.log('teacherId: ' + teacherId);
		
		var sql = 
		'select * from teacherattendance ' +
		'where tid = ' + teacherId;

		console.log (sql);

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})

// -------------------------------------------
// 7	/api/teacher/:teacherId/writeups


// -------------------------------------------
// 8	/api/teacher/:teacherId/assignments
	app.get('/api/teacher/:teacherId/assignments', function(req,res){
		var teacherId = req.params.teacherId;
		// console.log('teacherId: ' + teacherId);

		var sql = 
		'select * from assignments ' +
		'where tid = ' + teacherId;

		console.log(sql);

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})
// ------------------------------------------------------------------------
// STUDENTS PAGE
// 9	/api/student/:studentId/personalinfo
	app.get('/api/student/:studentId/personalinfo', function(req,res){
		var studentId = req.params.studentId;
		console.log('studentId: ' + studentId);

		var sql = 'select * from students ' +
		'where sid = ' + studentId;

		console.log(sql);

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})

// ------------------------------------------------------------------------
// 10	/api/student/:studentId/details
	app.get('/api/student/:studentId/details', function(req,res){
		var studentId = req.params.studentId;
		console.log('studentId: ' + studentId);

		var sql = 'select parents.* from parents ' +
				  'join students on parents.pid = students.pid ' +
		          'where sid = ' + studentId;

		console.log(sql);

		connection.query(sql,[],function(err, result){
			console.log('err' + err);
			res.send(result);
		});
	})

// ------------------------------------------------------------------------
// 11	/api/student/:studentId/assignments
app.get('/api/student/:studentId/assignments', function(req,res){
	var studentId = req.params.studentId;
	console.log('studentId: ' + studentId);

	var sql = 'select * from assignments ' +
	'join students on assignments.gid = students.gid ' +
	' where sid = ' + studentId;

	console.log(sql);

	connection.query(sql,[],function(err, result){
		console.log('err' + err);
		res.send(result);
	});
})

// =--------------------------------------------------
// 12	/api/student/:studentId/fees

// -------------------------------------------
// 13	/api/student/:studentId/attendance


// --------------------------------------------------
// PARENTS PAGE
// 14 /api/parent/:parentId/personalInfo
app.get('/api/parent/:parentId/personalinfo', function(req,res){
	var parentId = req.params.parentId;
	// console.log('teacherId: ' + teacherId);

	var sql = 
	'select * from parents ' +
	'where pid = ' + parentId;

	console.log(sql);

	connection.query(sql,[],function(err, result){
		console.log('err' + err);
		res.send(result);
	});
})
// ------------------------------------------------------------------
// 15	/api/get/:parentId/studentsenrolled
	app.get('/api/parent/:parentId/studentsenrolled', function(req,res){
		var parentId = req.params.parentId;
		console.log('parentId' + parentId);

		var sql = 
		'select * from students ' +
		'where pid = ' + parentId;

		// select * from students where pid = 2;

		connection.query(sql,[],function(err, result){
			console.log(sql);
			res.send(result);
		});
	})
 // ============================================
 
//=================================== 
app.listen(3000, () => console.log('API is running on port 3000!'))
// ====================================
// END