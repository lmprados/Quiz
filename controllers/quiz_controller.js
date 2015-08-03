var models = require('../models/models.js');

//Autoload - factoriza el codigo si ruta incluye :quizId
exports.load = function (req, res, next, quizId){
	models.Quiz.find(quizId).then (
		function(quiz) {
			if (quiz) {
				req.quiz=quiz;
				next();
			} else { next (new Error('No existe quizId='+quizId));}
	}).catch(function(error) {next (error);});
};

//GET /quizes
exports.index = function (req, res){
	models.Quiz.findAll().then (function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes, errors:[]});
	})
};

//GET /quizes/:id
exports.show = function(req, res){
	res.render('quizes/show', {quiz: req.quiz, errors:[]})
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
	var resultado = 'Incorrecto';
	if (req.query.respuesta===req.quiz.respuesta){
		resultado = 'Correcto';
	}
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado, errors:[]});
};

//GET /quizes/new
exports.new = function(req, res){
	var quiz = models.Quiz.build( 
		{pregunta: "Pregunta", respuesta: "Respuesta"}
	);

	res.render('quizes/new', {quiz: quiz, errors:[]});
};

//PUT /quizes/create
exports.create = function(req, res){
	var quiz = models.Quiz.build(req.body.quiz);

	/* quiz.validate()
	.then (
		function(err){
			if (err) {
				res.render('quizes/new', {quiz: quiz, errors: err.errors});
			} else {
				quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes')})
			}
	}); */
quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes')})
};

//GET /quizes/:id/edit
exports.edit = function(req, res){
	var quiz = req.quiz;

	res.render('quizes/edit', {quiz: quiz, errors:[]});
};

//PUT /quizes/update
exports.update = function(req, res){
	req.quiz.pregunta = req.body.quiz.pregunta;
	req.quiz.respuesta = req.body.quiz.respuesta;

	 /*req.quiz.validate()
	.then (
		function(err){
			if (err) {
				res.render('quizes/edit', {quiz: quiz, errors: err.errors});
			} else {
				req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes')})
			}
	}); */

req.quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
		res.redirect('/quizes')})
};

//DELETE /quizes/:id
exports.destroy = function(req, res){
	req.quiz.destroy().then(function(){
		res.redirect('/quizes');
	}).catch(function(error){next(error)});
};

//GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().success (function(quiz) {
		res.render('quizes/question', {pregunta:'Capital de Italia'})
	})
};

/*//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().success (function(quiz) {
		if (req.query.respuesta==='Roma'){
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
}*/

//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Fernando Alonso', foto: '/images/alo.jpg' });
}