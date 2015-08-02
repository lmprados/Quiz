var models = require('../models/models.js');

//GET /quizes/question
exports.question = function(req, res){
	models.Quiz.findAll().success (function(quiz) {
		res.render('quizes/question', {pregunta:'Capital de Italia'})
	})
};

//GET /quizes/answer
exports.answer = function(req, res){
	models.Quiz.findAll().success (function(quiz) {
		if (req.query.respuesta==='Roma'){
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
}

//GET /author
exports.author = function(req, res){
	res.render('author', {autor: 'Fernando Alonso', foto: '/images/alo.jpg' });
}