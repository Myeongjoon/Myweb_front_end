	var express = require('express');
	var path = require('path');
    var logger = require('morgan');
	var app      = express(); 							
	var mongoose = require('mongoose'); 			
	var morgan = require('morgan'); 		
	var methodOverride = require('method-override');
	var argv = require('optimist').argv;
	var multer  = require('multer');
	var fs = require('fs');
	var bodyParser = require('body-parser');
	var path = require('path');
	var is = require('type-is')
	app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	mongoose.connect('mongodb://' + argv.be_ip + ':80/my_database');
    app.use('/js', express.static(__dirname + '/js'));
   	app.use('/bower_components', express.static(__dirname + '/bower_components'));
	app.use(morgan('dev')); 									
	app.use(methodOverride());
	var Todo = mongoose.model('Todo', {
		title : String,
		completed: Boolean
	});

	var TB_LolCombinationOfChampion = mongoose.model('TB_LolCombinationOfChampion', {
		Top : Number,
		Mid : Number,
		Jungle : Number,
		Ad : Number,
		Support : Number,
		eTop : Number,
		eMid : Number,
		eJungle : Number,
		eAd : Number,
		eSupport : Number,
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
									console.log("req.body : \n")
									for (var property in req.body) {
											console.log("2");
											  output += property + ': ' + req.body[property]+'; \n';
											}
									console.log("1\n")		
									console.log(output+"\ns");
		//있나 없나 비교해야함
		TB_LolCombinationOfChampion.find(
			{
				Top : req.body.myteam.Top,
				Mid : req.body.myteam.Mid,
				Jungle : req.body.myteam.Jungle,
				Ad : req.body.myteam.Ad,
				Support : req.body.myteam.Support,
				eTop : req.body.enemy.eTop,
				eMid : req.body.enemy.eMid,
				eJungle : req.body.enemy.eJungle,
				eAd : req.body.enemy.eAd,
				eSupport : req.body.enemy.eSupport,
			},function(error,TB_L){
				if(error){

				}else{
					//있나 없나 비교함
					if(TB_L=[]){
						//아무것도 못찾은 상태
						console.log("this not exist\n");
						var TB = {};
						console.log(req.body.myteam.Top);
						var output="";
									console.log("req.body.myteam : \n")
									for (var property in req.body.myteam) {
											console.log("2");
											  output += property + ': ' + req.body.myteam[property]+'; \n';
											}
									console.log("1\n")		
									console.log(output+"\ns");
						if(req.body.myteam.win){
							//누가 이긴지 비교
							TB = {
								Top : req.body.myteam.Top,
								Mid : req.body.myteam.Mid,
								Jungle : req.body.myteam.Jungle,
								Ad : req.body.myteam.Ad,
								Support : req.body.myteam.Support,
								eTop : req.body.enemy.eTop,
								eMid : req.body.enemy.eMid,
								eJungle : req.body.enemy.eJungle,
								eAd : req.body.enemy.eAd,
								eSupport : req.body.enemy.eSupport,
								win : 1,
								lose : 0
							};
						}else{
							TB = {
								Top : req.body.myteam.Top,
								Mid : req.body.myteam.Mid,
								Jungle : req.body.myteam.Jungle,
								Ad : req.body.myteam.Ad,
								Support : req.body.myteam.Support,
								eTop : req.body.enemy.eTop,
								eMid : req.body.enemy.eMid,
								eJungle : req.body.enemy.eJungle,
								eAd : req.body.enemy.eAd,
								eSupport : req.body.enemy.eSupport,
								win : 0,
								lose : 1
							};
						}
						//인서트 함수

						
						TB_LolCombinationOfChampion.create(TB, function(err, todo) {
							if (err)
								res.send(err);

									var output="";
									console.log("req.body : \n")
									for (var property in req.body) {
											console.log("2");
											  output += property + ': ' + req.body[property]+'; \n';
											}
									console.log("1\n")		
									console.log(output+"\ns");

							res.json(todo);
							//Todo.find(function(err, todos) {
							//	if (err)
							//		res.send(err)
							//	res.json(todos);
							//});
						});
					}else{
						console.log("update\n");
						TB = {
								Top : req.body.myteam.Top,
								Mid : req.body.myteam.Mid,
								Jungle : req.body.myteam.Jungle,
								Ad : req.body.myteam.Ad,
								Support : req.body.myteam.Support,
								eTop : req.body.enemy.eTop,
								eMid : req.body.enemy.eMid,
								eJungle : req.body.enemy.eJungle,
								eAd : req.body.enemy.eAd,
								eSupport : req.body.enemy.eSupport,
							};
						if(req.body.win=1){
							TB_LolCombinationOfChampion.update(TB,{ $set: { win: TB_L[0].win+1 }});
							
						}else{
							TB_LolCombinationOfChampion.update(TB,{ $set: { lose: TB_L[0].lost+1 }});
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
				//res.send(err);

			Todo.find(function(err, todos) {
				if (err){

				}
					//res.send(err)
				//res.json(todos);
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
		console.log("1");
		console.log(req.file);
		res.send(200);
	})
	app.listen(8080, argv.fe_ip);
	console.log("App listening on port 8080");
