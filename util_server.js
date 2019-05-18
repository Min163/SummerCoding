module.exports = function(){
	return{

		permittedAccess : function(req, res, next){
			if(req.xhr) next();
			else res.redirect("/");
		},

	}
}