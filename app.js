const path = require("path");
const DBPATH = 'curriculo.db';

// Importa as configurações do app
require("dotenv").config({ encoding: "utf8", path: path.join(__dirname, ".env") });

const express = require('express'); 
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


const sqlite3 = require('sqlite3').verbose();
const app = express();


app.use(express.static("./frontend/"));
app.use(express.json());


/* Definição dos endpoints */

/****** CRUD ******************************************************************/

// Retorna todos registros (é o R do CRUD - Read)
app.get('/getprojects', (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	var db = new sqlite3.Database(DBPATH); // Abre o banco
   	var sql = 'SELECT * FROM projects';
	db.all(sql, [],  (err, rows ) => {
		if (err) {
		    throw err;
		}
		else console.log(sql);
		res.json(rows);
	});
	db.close(); // Fecha o banco
});



// Insere um registro (é o C do CRUD - Create)
app.post('/insertdata', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = `INSERT INTO projects (image, name, description, link) values ('${req.body.image}', '${req.body.name}', '${req.body.description}', '${req.body.link}')`
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
	});
	db.close(); // Fecha o banco
	res.end();
});


// Atualiza um registro (é o U do CRUD - Update)
app.post('/userupdate', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS

	sql = "UPDATE projects SET name = '" + req.body.name + "' WHERE userId = " + req.body.id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		res.end();
	});
	db.close(); // Fecha o banco
});

// Exclui um registro (é o D do CRUD - Delete)
app.get('/userdelete', urlencodedParser, (req, res) => {
	res.statusCode = 200;
	res.setHeader('Access-Control-Allow-Origin', '*'); // Isso é importante para evitar o erro de CORS
	let id = req.query['id'];
	sql = "DELETE FROM projects WHERE id = " + id;
	var db = new sqlite3.Database(DBPATH); // Abre o banco
	db.run(sql, [],  err => {
		if (err) {
		    throw err;
		}
		else console.log(sql);
		res.write('<a href="">VOLTAR</a>');
		res.end();
	});
	db.close(); // Fecha o banco
});

/* Inicia o servidor */
const server = app.listen(parseInt(process.env.PORT), process.env.IP, () => {
	console.log("Servidor executando na porta " + server.address().port);
});