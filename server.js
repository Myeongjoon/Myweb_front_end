	var express = require('express');
	var path = require('path');
	var app      = express(); 							
	var mongoose = require('mongoose'); 	
	var methodOverride = require('method-override');
	var multer  = require('multer');
	var fs = require('fs');
	var bodyParser = require('body-parser');
	var path = require('path');
	var is = require('type-is')
	var mysql      = require('mysql');
	app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

    app.use('/js', express.static(__dirname + '/js'));
   	app.use('/bower_components', express.static(__dirname + '/bower_components'));									
	app.use(methodOverride());
	var Todo = mongoose.model('Todo', {
		title : String,
		completed: Boolean
	});

	app.get('/api/todos', function(req, res) {

		Todo.find(function(err, todos) {

			if (err)
				res.send(err)

			res.json(todos);
		});
	});

	var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/home/kimmj8409/Myweb_front_end/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
	})
	var upload = multer({ storage: storage });
	
	app.use(multer({ storage: storage }).single('fileUpload'));

	app.post('/upload',function (req, res, next) {
		console.log("file uploaded");
		console.log(req.file);
		res.send(200);
	});

	app.post('/api/todos', function(req, res) {

		Todo.create({
			title : req.body.title,
			completed : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	app.put('/api/todos/:todo_id', function(req, res){
	  return Todo.findById(req.params.todo_id, function(err, todo) {
	    todo.title = req.body.title;
	    todo.completed = req.body.completed;
	    return todo.save(function(err) {
	      if (err) {
	        res.send(err);
	      }
	      return res.send(todo);
	    });
	  });
	});

	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	app.get('/', function(req, res) {
		res.sendFile('index.html');
	});

	app.get('/favicon.ico', function(req, res) {
		res.sendFile('node_modules/eyeserver/node_modules/express/node_modules/connect/lib/public/favicon.ico');
	});

	app.get('/learn.json', function(req, res) {
		res.sendFile('learn.json');
	});
	
	app.get('/four_in_a_row', function(req, res) {
		res.sendFile('four_in_a_row.html');
	});
	
	app.get('/media/:id', function(req, res) {
		res.sendFile('media/'+req.params.id);
	});
	
	app.get('/data.n3', function(req, res) {
		res.sendFile('data.n3');
		console.log("/data.n3 accessed");
	});

	app.get('/query.n3', function(req, res) {
		res.sendFile('query.n3');
		console.log("/query.n3 accessed");
	});

	app.listen(8080, 8080);
	console.log("App listening on port 8080");
              