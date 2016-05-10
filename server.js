/**
 * @license
 * Everything in this repo is MIT License unless otherwise specified.
 *
 * Copyright (c) Addy Osmani, Sindre Sorhus, Pascal Hartig, Stephen  Sawchuk, Google, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

	// set up ========================
	var express = require('express');
	var path = require('path');
    var logger = require('morgan');
    var methodOverride = require('method-override');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan'); 			// log requests to the console (express4)
	var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
	var argv = require('optimist').argv;
	//var fileupload = require('fileupload').createFileUpload('/uploadDir').middleware
	var fs = require('fs');

	// configuration =================

	mongoose.connect('mongodb://' + argv.be_ip + ':80/my_database');

    app.use('/js', express.static(__dirname + '/js'));
   	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 										// log every request to the console
	//app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	//app.use(bodyParser.json()); 									// parse application/json
	//app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
	app.use(methodOverride());

	// define model =================
	var Todo = mongoose.model('Todo', {
		title : String,
		completed: Boolean
	});

	// routes ======================================================================

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/todos', function(req, res) {

		// use mongoose to get all todos in the database
		Todo.find(function(err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		// create a todo, information comes from AJAX request from Angular
		Todo.create({
			title : req.body.title,
			completed : false
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
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

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {
		Todo.remove({
			_id : req.params.todo_id
		}, function(err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Todo.find(function(err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		res.sendfile('index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});
	
	app.get('/lol_home', function(req, res) {
		res.sendfile('lol_home.html'); //go to lol_home.htmls
	});
	
	app.get('/four_in_a_row', function(req, res) {
		res.sendfile('four_in_a_row.html'); //go to lol_home.htmls
	});
	
	app.get('/media/:id', function(req, res) {
		res.sendfile('media/'+req.params.id); //go to lol_home.htmls
	});
	
	app.get('/data.n3', function(req, res) {
		res.sendfile('data.n3'); //go to lol_home.htmls
		console.log("/data.n3 accessed");
	});

	app.get('/query.n3', function(req, res) {
		console.log("/query.n3 accessed");
		res.sendfile('query.n3'); //go to lol_home.htmls
		console.log("/query.n3 accessed");
	});
	
	app.use(bodyParser({keepExtensions:true,uploadDir:path.join(__dirname,'/files')}));
	
	// listen (start app with node server.js) ======================================
	var busboy = require('connect-busboy');
	app.use(busboy()); 
	var fileupload = require('fileupload').createFileUpload('/home/kimmj8409/Myweb_front_end').middleware
	app.post('/upload', fileupload, function(req, res) {
		var i=0;
		var output = '';
		console.log(req);
		for (var property in req) {
			i++;
		output +=i+"'th is : ["+ property + ']: ' + req[property]+'; \n';
		}
		//console.log("req.pipe()"+req.pipe);
		console.log("req: "+output);
		//console.log("req.fileUpload : "+req.fileUpload);

		
		//var output = 'req.files \n';
		//for (var property in req.files) {
		//	i++;
		//output +=i+"'th is : ["+ property + ']: ' + req.files[property]+'; \n';
		//}
		
		console.log(output);
		console.log(req.files.fileUpload);
		console.log(req.files.keywords);
		/*fs.readFile(req.files.uploadFile.path,function(error,data){
			
			var filePath = ___dirname + req.files.uploadFile.name;
			fs.writeFile(filePath,data,function(error){
				if(error){
					throw err;
				}else{
					res.redirect("back");
				}
			})
		})
		*/
		res.send(req.body);
	// files are now in the req.body object along with other form fields
	// files also get moved to the uploadDir specified
	})
	
	app.listen(8080, argv.fe_ip);
	console.log("App listening on port 8080");
