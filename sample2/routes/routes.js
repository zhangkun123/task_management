var mongoose = require('mongoose');

var taskSchema = new mongoose.Schema(
	{ 
		name: { type: String, required: true }, 
		priority: { type: String, required: true } ,
		deadline: {type: Date, required: true },
		created: { type: Date, default: Date.now }
	}
);

var Task = mongoose.model('Task', taskSchema);
var error_msg =[];
mongoose.connect('mongodb://localhost/taskApp_dev');

module.exports = function Route (app) {

	app.get('/', function (req, res) {
		Task.find({}, function (err, tasks) {
			if (err) {

			}
			else {
				res.render ('index', { tasks: tasks, errors: error_msg });
				error_msg = [];
			}
		})
	})

	app.post('/create', function (req, res) {
		console.log(req.body);
		var task = new Task(req.body);
	
		task.save(function (err) {
			if (err) {
				for (var i in err.errors) {
					error_msg.push(err.errors[i].message);
				}
				res.redirect('/');
			}
			else {
				res.redirect('/');
			}
		})
	})

	app.get('/delete/:id', function (req, res) {
		console.log(req.params);
		Task.remove({ _id: req.params.id }, function (err) {
			if (err) {

			}
			else {
				res.redirect('/');
			}
		})
	})
}
