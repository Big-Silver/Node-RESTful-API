// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase'); // connect to our database
var Model     = require('./app/models/model');

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// on routes that end in /models
// ----------------------------------------------------
router.route('/models')

	// create a model (accessed at POST http://localhost:8080/models)
	.post(function(req, res) {
		
		var model = new Model();		// create a new instance of the Model model
		model.name = req.body.name;  // set the models name (comes from the request)
		model.age = req.body.age;

		model.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Model created!' });
		});

		
	})

	// get all the models (accessed at GET http://localhost:8080/api/models)
	.get(function(req, res) {
		Model.find(function(err, models) {
			if (err)
				res.send(err);

			res.json(models);
		});
	});

// on routes that end in /models/:model_id
// ----------------------------------------------------
router.route('/models/:model_id')

	// get the model with that id
	.get(function(req, res) {
		Model.findById(req.params.model_id, function(err, model) {
			if (err)
				res.send(err);
			res.json(model);
		});
	})

	// update the model with this id
	.put(function(req, res) {
		Model.findById(req.params.model_id, function(err, model) {

			if (err)
				res.send(err);

			model.name = req.body.name;
			model.age = req.body.age;
			model.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Model updated!' });
			});

		});
	})

	// delete the model with this id
	.delete(function(req, res) {
		Model.remove({
			_id: req.params.model_id
		}, function(err, model) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});


// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
