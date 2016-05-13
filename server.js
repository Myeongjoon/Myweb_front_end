	var express = require('express');
	var path = require('path');
    var logger = require('morgan');
    var methodOverride = require('method-override');
	var app      = express(); 							
	var mongoose = require('mongoose'); 			
	var morgan = require('morgan'); 		
	var bodyParser = require('body-parser'); 
	var methodOverride = require('method-override');
	var argv = require('optimist').argv;
	var multer  = require('multer')
	var fs = require('fs');
	var formidable = require('formidable');
	var upload = multer({ dest: 'uploads/' })

	mongoose.connect('mongodb://' + argv.be_ip + ':80/my_database');
    app.use('/js', express.static(__dirname + '/js'));
   	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 									
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
		res.sendfile('index.html');
	});
	
	app.get('/lol_home', function(req, res) {
		res.sendfile('lol_home.html');
	});
	
	app.get('/four_in_a_row', function(req, res) {
		res.sendfile('four_in_a_row.html');
	});
	
	app.get('/media/:id', function(req, res) {
		res.sendfile('media/'+req.params.id);
	});
	
	app.get('/data.n3', function(req, res) {
		res.sendfile('data.n3');
		console.log("/data.n3 accessed");
	});

	app.get('/query.n3', function(req, res) {
		console.log("/query.n3 accessed");
		res.sendfile('query.n3');
		console.log("/query.n3 accessed");
	});
	
	app.post('/upload',upload.single('fileUpload'),function (req, res, next) {
		res.send(200);
	})
	app.listen(8080, argv.fe_ip);
	console.log("App listening on port 8080");
