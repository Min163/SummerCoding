var Work = require('../models/work.js');
var workViewModel = require('../viewModels/work.js');

module.exports = function(){
	return {

		getWorks: function(req, res, next){
			Work.find(req.query).sort({updated_at:'-1'})
			.exec(function(err, works){
				if(err) return next(err);
				res.json(works.map(workViewModel));
			});
		},

		newWork: function(req, res, next){
			if(req.body.workTitle){
				Work.create(req.body, function(err, work){
					if(err) return next(err);
					res.json({
						success: true,
						id: work._id,
					});
				});
			}else{
				res.json({
					success: false,
					message: 'Required Data is not filled yet.',
				});
			}
		},

		getWork: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Work.findById({_id: req.params.id}, function(err, work){
				if(err) console.error(err);
				if(!work){
					return res.json({
						success: false,
						message: 'NO DATA',
					});
				};
				return res.json(workViewModel(work));
			});
		},

		deleteWork: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Work.remove({_id: req.params.id}, function(err){
				if(err) return next(err);
				res.json({
					success: true,
				});
			});
		},

		updateWork: function(req, res, next){
			if(!req.params.id) return next('No Id');
			Work.update({_id: req.params.id}, req.body ,function(err, response){
				if(err) console.error(err);
				if(response.nModified === 1){
					res.json({
						success: true,
						id: req.params.id,
					});
				} else {
					res.json({
						success: false,
						message: ''
					});
				}
			});
		},

	}
}