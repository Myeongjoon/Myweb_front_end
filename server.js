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
	var express  = require('express');
	var app      = express(); 								// create our app w/ express
	var mongoose = require('mongoose'); 					// mongoose for mongodb
	var morgan = require('morgan'); 			// log requests to the console (express4)
	var bodyParser = require('body-parser'); 	// pull information from HTML POST (express4)
	var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
	var argv = require('optimist').argv;

	// configuration =================

	mongoose.connect('mongodb://' + argv.be_ip + ':80/my_database');

    	app.use('/js', express.static(__dirname + '/js'));
   	 app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 										// log every request to the console
	app.use(bodyParser.urlencoded({'extended':'true'})); 			// parse application/x-www-form-urlencoded
	app.use(bodyParser.json()); 									// parse application/json
	app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
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
	
	app.get('/media/challenger_1.png', function(req, res) {
		res.sendfile('media/challenger_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/master_1.png', function(req, res) {
		res.sendfile('media/master_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/diamond_5.png', function(req, res) {
		res.sendfile('media/diamond_5.png'); //go to lol_home.htmls
	});
	
	app.get('/media/diamond_4.png', function(req, res) {
		res.sendfile('media/diamond_4.png'); //go to lol_home.htmls
	});
	
	app.get('/media/diamond_3.png', function(req, res) {
		res.sendfile('media/diamond_3.png'); //go to lol_home.htmls
	});
	
	app.get('/media/diamond_2.png', function(req, res) {
		res.sendfile('media/diamond_2.png'); //go to lol_home.htmls
	});
	
	app.get('/media/diamond_1.png', function(req, res) {
		res.sendfile('media/diamond_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/platinum_5.png', function(req, res) {
		res.sendfile('media/platinum_5.png'); //go to lol_home.htmls
	});
	
	app.get('/media/platinum_4.png', function(req, res) {
		res.sendfile('media/platinum_4.png'); //go to lol_home.htmls
	});
	
	app.get('/media/platinum_3.png', function(req, res) {
		res.sendfile('media/platinum_3.png'); //go to lol_home.htmls
	});
	
	app.get('/media/platinum_2.png', function(req, res) {
		res.sendfile('media/platinum_2.png'); //go to lol_home.htmls
	});
	
	app.get('/media/platinum_1.png', function(req, res) {
		res.sendfile('media/platinum_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/gold_5.png', function(req, res) {
		res.sendfile('media/gold_5.png'); //go to lol_home.htmls
	});
	
	app.get('/media/gold_4.png', function(req, res) {
		res.sendfile('media/gold_4.png'); //go to lol_home.htmls
	});
	
	app.get('/media/gold_3.png', function(req, res) {
		res.sendfile('media/gold_3.png'); //go to lol_home.htmls
	});
	
	app.get('/media/gold_2.png', function(req, res) {
		res.sendfile('media/gold_2.png'); //go to lol_home.htmls
	});
	
	app.get('/media/gold_1.png', function(req, res) {
		res.sendfile('media/gold_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/silver_5.png', function(req, res) {
		res.sendfile('media/silver_5.png'); //go to lol_home.htmls
	});
	app.get('/media/silver_4.png', function(req, res) {
		res.sendfile('media/silver_4.png'); //go to lol_home.htmls
	});
	
	app.get('/media/silver_3.png', function(req, res) {
		res.sendfile('media/silver_3.png'); //go to lol_home.htmls
	});
	
	app.get('/media/silver_2.png', function(req, res) {
		res.sendfile('media/silver_2.png'); //go to lol_home.htmls
	});
	
	app.get('/media/silver_1.png', function(req, res) {
		res.sendfile('media/silver_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/bronze_5.png', function(req, res) {
		res.sendfile('media/bronze_5.png'); //go to lol_home.htmls
	});
	
	app.get('/media/bronze_4.png', function(req, res) {
		res.sendfile('media/bronze_4.png'); //go to lol_home.htmls
	});
	
	app.get('/media/bronze_3.png', function(req, res) {
		res.sendfile('media/bronze_3.png'); //go to lol_home.htmls
	});
	
	app.get('/media/bronze_2.png', function(req, res) {
		res.sendfile('media/bronze_2.png'); //go to lol_home.htmls
	});
	
	app.get('/media/bronze_1.png', function(req, res) {
		res.sendfile('media/bronze_1.png'); //go to lol_home.htmls
	});
	
	app.get('/media/Unranked.png', function(req, res) {
		res.sendfile('media/Unranked.png'); //go to lol_home.htmls
	});

	// listen (start app with node server.js) ======================================
	app.listen(8080, argv.fe_ip);
	console.log("App listening on port 8080");
