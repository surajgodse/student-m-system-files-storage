const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"Root@2140",
	database:"sfs16july24"
});

// Set up multer for file uploads

const storage = multer.diskStorage({
	destination:(req, file, cb)=>{
	cb(null, 'uploads/');		//Destination file folder for upload
	},
	filename:(req,file,cb)=>{
	cb(null, Date.now() + path.extname(file.originalname));
	}
});

const upload = multer({ storage });



//server uploaded file statically

app.use('/uploads', express.static('uploads'));



app.post("/save", upload.single('file'), (req, res)=>{
	let data = [req.body.rno, req.body.name, req.body.marks, req.file.filename];
	console.log(data);
	let sql = "insert into student values(?,?,?,?)";
	con.query(sql, data, (err, result)=>{
		if(err)		res.send(err);
		else 		res.send(result);
	});
});



app.get("/read", (req, res)=>{
	let data = [req.body.rno, req.body.name, req.body.marks];
	let sql = "select * from student";
	con.query(sql, (err, result)=>{
		if(err)		res.send(err);
		else 		res.send(result);
	});
});


app.delete("/remove", (req, res)=>{
	let data = [req.body.rno];
	let sql = "delete from student where rno=?";
	con.query(sql, data, (err, result)=>{
		if(err)		res.send(err);
		else 		res.send(result);
	});
});






app.listen(9000, () => { console.log("ready @ 9000"); });	

