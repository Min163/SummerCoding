var express = require('express');
var router = express.Router();

var workHandlers =require('../handlers/work.js')();
var util_server = require('../util_server.js')();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.route('/').get(function(req, res){
	res.render('index', {
		layout: false
	});
})

/* work */
// router.get('/api/work', util_server.permittedAccess, workHandlers.getWorks);
router.get('/api/work', workHandlers.getWorks);

router.post('/api/work', workHandlers.newWork);

router.get('/api/work/:id', workHandlers.getWork);

router.delete('/api/work/:id', workHandlers.deleteWork);

router.put('/api/work/:id', workHandlers.updateWork);


module.exports = router;
