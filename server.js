	var express = require('express');
	var path = require('path');
    var logger = require('morgan');
	var app      = express(); 							
	var mongoose = require('mongoose'); 			
	var morgan = require('morgan'); 		
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

	mongoose.connect('mongodb://104.154.236.87:80/my_database',
		function(err, db){
    		if( !err ){
         		console.log("mongodb is connected");
    		} else {
    			console.log(err);
    			console.log("did not connected");
    		}
		});
    app.use('/js', express.static(__dirname + '/js'));
   	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 									
	app.use(methodOverride());
	var Todo = mongoose.model('Todo', {
		title : String,
		completed: Boolean
	});

	var TB_LolCombinationOfChampion = mongoose.model('TB_LolCombinationOfChampion', {
		TOP : Number,
		MIDDLE : Number,
		JUNGLE : Number,
		DUO_CARRY : Number,
		DUO_SUPPORT : Number,
		eTOP : Number,
		eMIDDLE : Number,
		eJUNGLE : Number,
		eDUO_CARRY : Number,
		eDUO_SUPPORT : Number,
		win : Number,
		lose : Number
	});
	
	app.get('/api/TB_LolCombinationOfChampion', function(req, res) {

		TB_LolCombinationOfChampion.find(function(err, TB_LolCombinationOfChampion) {

			if (err)
				res.send(err)

			res.json(TB_LolCombinationOfChampion);
		});
	});

	app.get('/api/todos', function(req, res) {

		Todo.find(function(err, todos) {

			if (err)
				res.send(err)

			res.json(todos);
		});
	});

	app.post('/api/TB_LolCombinationOfChampion', function(req, res) {

		var output="";
		for (var property in req.body) {
			output += property + ': ' + req.body[property]+'; \n';
		}
		//있나 없나 비교해야함
		TB_LolCombinationOfChampion.find(
			{
				TOP : req.body.myteam.TOP,
				MIDDLE : req.body.myteam.MIDDLE,
				JUNGLE : req.body.myteam.JUNGLE,
				DUO_CARRY : req.body.myteam.DUO_CARRY,
				DUO_SUPPORT : req.body.myteam.DUO_SUPPORT,
				eTOP : req.body.enemy.TOP,
				eMIDDLE : req.body.enemy.MIDDLE,
				eJUNGLE : req.body.enemy.JUNGLE,
				eDUO_CARRY : req.body.enemy.DUO_CARRY,
				eDUO_SUPPORT : req.body.enemy.DUO_SUPPORT,
			},function(error,TB_L){
				if(error){

				}else{
					console.log("TB_L : ");
					console.log(TB_L);
					//있나 없나 비교함
					if(Object.keys(TB_L).length === 0){
						//아무것도 못찾은 상태
						console.log("this not exist\n");
						var TB = {};
						var output="";
									for (var property in req.body.myteam) {
											 output += property + ': ' + req.body.myteam[property]+'; \n';
											}
									var output="";
									for (var property in req.body.enemy) {
											 output += property + ': ' + req.body.enemy[property]+'; \n';
											}
						if(req.body.myteam.win){
							//누가 이긴지 비교
							TB = {

								TOP : req.body.myteam.TOP,
								MIDDLE : req.body.myteam.MIDDLE,
								JUNGLE : req.body.myteam.JUNGLE,
								DUO_CARRY : req.body.myteam.DUO_CARRY,
								DUO_SUPPORT : req.body.myteam.DUO_SUPPORT,
								eTOP : req.body.enemy.TOP,
								eMIDDLE : req.body.enemy.MIDDLE,
								eJUNGLE : req.body.enemy.JUNGLE,
								eDUO_CARRY : req.body.enemy.DUO_CARRY,
								eDUO_SUPPORT : req.body.enemy.DUO_SUPPORT,
								win : 1,
								lose : 0
							};
						}else{
							TB = {
								TOP : req.body.myteam.TOP,
								MIDDLE : req.body.myteam.MIDDLE,
								JUNGLE : req.body.myteam.JUNGLE,
								DUO_CARRY : req.body.myteam.DUO_CARRY,
								DUO_SUPPORT : req.body.myteam.DUO_SUPPORT,
								eTOP : req.body.enemy.TOP,
								eMIDDLE : req.body.enemy.MIDDLE,
								eJUNGLE : req.body.enemy.JUNGLE,
								eDUO_CARRY : req.body.enemy.DUO_CARRY,
								eDUO_SUPPORT : req.body.enemy.DUO_SUPPORT,
								win : 0,
								lose : 1
							};
						}
						//인서트 함수
						TB_LolCombinationOfChampion.create(TB, function(err, todo) {
							if (err)
								res.send(err);

									var output="";
									for (var property in req.body) {
											  output += property + ': ' + req.body[property]+'; \n';
											}
							res.json(todo);
						});
					}else{
						console.log("update\n");
						console.log(TB);
						TB = {"TOP":17,"MIDDLE":45,"JUNGLE":113,"DUO_CARRY":67,"DUO_SUPPORT":43,"eTOP":122,"eMIDDLE":268,"eJUNGLE":203,"eDUO_CARRY":222,"eDUO_SUPPORT":16,"win":1,"lose":0,"_id":"575e682c44d6ba7208b9d7c3","__v":0}
						console.log(TB);	
						if(req.body.win==1){
							var a=0;
							a=TB_L[0].win+1;
							console.log(TB);
							TB_LolCombinationOfChampion.update({},{ $set: { win: a }},{multi: true},function (err, raw) {
							if (err) console.log(err);
							console.log('The raw response from Mongo was ', raw);
							});
							
						}else{
							var a=0;
							a=TB_L[0].lose+1;
							console.log(TB);
							TB_LolCombinationOfChampion.update({},{ $set: { lose: a }},{multi: true},function (err, raw) {
							if (err) console.log(err);
							console.log('The raw response from Mongo was ', raw);
							});
						}
						//찾았으니까 덧셈을 한다.
					}
				}
			}
		)
		//있으면 덧셈 
		//없으면 추가
		Todo.create({
			title : req.body.title,
			completed : false
		}, function(err, todo) {
			if (err)
			Todo.find(function(err, todos) {
				if (err){

				}
			});
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

	app.get('/favicon.ico', function(req, res) {
		res.sendfile('node_modules/eyeserver/node_modules/express/node_modules/connect/lib/public/favicon.ico');
	});

	app.get('/learn.json', function(req, res) {
		res.sendfile('learn.json');
	});
	
	app.get('/lol_home', function(req, res) {
		res.sendfile('lol_home.html');
	});


// careerPredictor -->
	
	app.get('/careerPredictor/userCreate', function(req, res) {
		res.sendfile('src/careerPredictor/userCreate.html');
	});


  	app.post("/edunet/XML/:classID/:index",function(request,response){
  		
		});

// /careerPredictor	
	
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
	
// for pink.date start


// for pink.date end  	

//edunet start


//edunet end
	
		
	var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '/home/kimmj8409/Myweb_front_end/')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
	})
	var upload = multer({ storage: storage })
	
	app.use(multer({ storage: storage }).single('fileUpload'));
	app.post('/upload',function (req, res, next) {
		console.log("file uploaded");
		console.log(req.file);
		res.send(200);
	})



	app.listen(8080, 8080);
	console.log("App listening on port 8080");





              
