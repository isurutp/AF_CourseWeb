const express = require('express') ;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let Assignments = require('./DBSchema/AssignmentSchema');
let studentList = require('./DBSchema/StudentSchema');

//******************************************* REMOVE THIS CODE *********************************************************
//**********************************************************************************************************************

let courseList = require('./DBSchema/course.model') ;

//**********************************************************************************************************************
//**********************************************************************************************************************

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



//************************************************* STUDENT ************************************************************
//**********************************************************************************************************************

courseRoutes.post('/student/add', function(req,res){
    let list =  new studentList(req.body);
    list.save()
        .then(list => {
            res.status(200).json({message: 'Successfully added', data: list})
        })
        .catch(err => {
            res.status(400).json({message: 'Something went wrong', error: err})
        })
});

courseRoutes.get('/student/all', function (req,res) {
    studentList.find(function (err,list) {
        if (err){
            res.status(400).json({message: 'Something went wrong', error: err})
        }else{
            res.status(200).json(list)
        }
    })
});

courseRoutes.get('/student/:id', function (req,res) {
    studentList.find({_id : req.params.id}, function(err, list){
        if(err){
            res.status(400).json({message: 'Something went wrong', error: err})
        }else{
            res.status(200).json(list)
        }
    })
});

courseRoutes.post('/student/enroll/:studentId', function (req,res) {
    studentList.findById(req.params.studentId , function (err,student) {
        if (!student){
            res.status(404).json({message: 'Data not found'})
        }else{
            student.student_courses.push(req.body);

            student.save()
                .then(course => {
                    res.status(200).json({message: 'Successfully added', data: course})
                })
                .catch(err => {
                    res.status(400).json({message: 'Update failed', error: err})
                })
        }
    })
});

courseRoutes.get('/student/assignments/:studentId', function (req,res) {
    studentList.findById(req.params.studentId, function (err, student) {
        if (!student){
            res.status(404).json({message: 'Data not found'})
        }else{
            var count = student.student_courses.length ;
            const courseList = [] ;
            const assignmentList = [] ;
            var i ;

            for (i=0 ; i<count ; i++){
                courseList.push(student.student_courses[i].courseId);
            };

            function getDetails(){
                for (i=0 ; i<count ; i++){
                    Assignments.find({assignment_course : student.student_courses[i].courseId}, function(err, assignments){
                        assignmentList.push(assignments);
                    });
                };
            }

            function sendDetails(){
                setTimeout( function(){
                    res.status(200).send(assignmentList);
                }, 500 );
            }

            getDetails();
            sendDetails();
        }
    })
});

//****************************************** END OF STUDENT END POINTS *************************************************
//**********************************************************************************************************************


//******************************************* REMOVE THIS CODE *********************************************************
//**********************************************************************************************************************

courseRoutes.post('/course/add', function(req,res){
    let list =  new courseList(req.body);
    list.save()
        .then(list => {
            res.status(200).json({message: 'Successfully added', data: list})
        })
        .catch(err => {
            res.status(400).json({message: 'Something went wrong', error: err})
        })
});

courseRoutes.get('/course/all', function (req,res) {
    courseList.find(function (err,list) {
        if (err){
            res.status(400).json({message: 'Something went wrong', error: err})
        }else{
            res.status(200).json(list)
        }
    })
});

//**********************************************************************************************************************
//**********************************************************************************************************************

app.use('/courseweb', courseRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port : " + PORT);
});