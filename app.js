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
	var searchvar = req.param('searchvar');
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

// 2	/api/search/student
	//app.get = ('/api/search/student'), 

// 3	/api/search/parent
	

// ============================================
//=================================== 
app.listen(3000, () => console.log('API is running on port 3000!'))
// ====================================
// END