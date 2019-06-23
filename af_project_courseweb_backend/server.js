const express = require('express') ;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

let Assignments = require('./DBSchema/AssignmentSchema');
let studentList = require('./DBSchema/StudentSchema');

let Admin = require('./routes/admin.route');
let Instructor = require('./routes/instructor.route');
let Course = require('./routes/course.route');

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
    let courseNo = req.params.id;
    Assignments.find({assignment_course : courseNo}, function(err, assignments){
        res.json(assignments);
    })
});

//Update Assignment
courseRoutes.route('/assignments/update/:id').post(function(req, res){
    let id = req.params.id;
    Assignments.findById(id, function (err, assignment){
        if(!assignment){
            res.status(404).send('Assignment not found');
        }
        else{
            assignment.assignment_name = req.body.assignment_name;
            assignment.assignment_course = req.body.assignment_course;
            assignment.assignment_due = req.body.assignment_due;
            assignment.assignment_marks = req.body.assignment_marks;

            assignment.save()
            .then(assignment => {
                res.json('Assignment Updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
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
            const assignmentList = [] ;
            var i ;

            function isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            }

            function getDetails(){
                for (i=0 ; i<count ; i++){
                    Assignments.find({assignment_course : student.student_courses[i].courseId}, function(err, assignments){
                        if (!isEmpty(assignments)){
                            assignmentList.push(assignments);
                        }
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

courseRoutes.get('/student/my_courses/:studentId', function (req,res) {
    studentList.findById(req.params.studentId, function (err, student) {
        if (!student){
            res.status(404).json({message: 'Data not found'})
        }else{
            var count = student.student_courses.length ;
            const courseListTemp = [] ;
            var i ;

            function isEmpty(obj) {
                for(var key in obj) {
                    if(obj.hasOwnProperty(key))
                        return false;
                }
                return true;
            }

            function getDetails(){
                for (i=0 ; i<count ; i++){
                    courseList.findById(student.student_courses[i].courseId, function(err, courses){
                        if (!isEmpty(courses)){
                            courseListTemp.push(courses);
                        }
                    });
                };
            }

            function sendDetails(){
                setTimeout( function(){
                    res.status(200).send(courseListTemp);
                }, 1500 );
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

app.use('/admin', Admin);
app.use('/instructor', Instructor);
app.use('/course', Course);
app.use('/courseweb', courseRoutes);

app.listen(PORT, function () {
    console.log("Server is running on port : " + PORT);
});