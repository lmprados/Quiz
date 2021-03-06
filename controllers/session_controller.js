//MW de autorizacion de accesos HTTP restringidos
exports.loginRequired = function(req, res, next){

	// Calculamos el tiempo entre transacciones
	var timeDiference = (req.session.lastTransactionTime.getTime()-req.session.prevTransactionTime.getTime()) / 1000;
	
	if (req.session.user && (timeDiference < 120)) {
		next();
	} else {
		if (req.session.user) {delete req.session.user;}
		res.redirect('/login');
	}
};

//GET /login  -- Formulario de login
exports.new = function(req, res){
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new.ejs', {errors: errors});
};

//POST /login       -- Crear la session
exports.create = function(req, res){
	var login = req.body.login;
	var password = req.body.password;

	var userController = require ('./user_controller');
	userController.autenticar (login, password, function(error, user) {
		if (error) { // si hay error retornamos mensajes de error de sesion
			req.session.errors = [{"message": 'Se ha producido un error: '+error}];
			res.redirect("/login");
			return;
		}

		//Crear req.session.user y guardar campos id y username
		// La sesion se define por la existencia de: req.session.usr
		req.session.user = {id:user.id, username:user.username};

		res.redirect(req.session.redir.toString()); // redireccion a path anterior a login
	});
};

// DELETE /logout   -- Destruir sesion
exports.destroy = function (req, res){
	delete req.session.user;
	res.redirect(req.session.redir.toString()); // redireccion a path anterior a login
};



