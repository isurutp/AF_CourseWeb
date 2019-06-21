const express = require('express') ;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let Assignments = require('./DBSchema/AssignmentSchema');

const courseRoutes = express.Router();


app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;

mongoose.connect('mongodb://127.0.0.1:27017/courseweb', {useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB connection successful");
});

courseRoutes.route('/assignments/add').post(function (req, res){
    let assignments = new Assignments(req.body);
    assignments.save()
    .then(assignments => {
        res.status(200).send('Assignment added Successfully');
    })
    .catch(err =>{
        res.status(400).send(err);
    });
});

//view assignments of a particular course
courseRoutes.route('/assignments/:courseNo').get(function(req, res){
    let courseNo = req.params.courseNo;
    Assignments.find({assignment_course : courseNo}, function(err, assignments){
        res.json(assignments);
    })
});


app.use('/courseweb', courseRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port : " + PORT);
});