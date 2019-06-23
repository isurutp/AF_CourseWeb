const express = require('express');
const router = express.Router();
const courseModel = require('../DBSchema/course.model');

router.route('/').get((req,res) => {
    courseModel.find((err, Course) => {
        if(err){
            console.log(err);
        }else {
            res.json(Course);
        }
    });
});

router.route('/:id').get((req,res) => {
    let id = req.params.id;
    courseModel.findById(id, (err,course) => {
        if(!err){
            res.json(course);
        }else {
            console.log(err);
        }
    });
});

router.route('/n/:name').get(function (req, res) {
    let name = req.params.name;
    courseModel.find({"course_instructor" : name}, function (err, course){
        if(!err){
            res.json(course);
        }
        else{
            console.log(err);
        }
    });
});

router.route('/add').post((req,res) => {
    let course = new courseModel(req.body);
    course.save()
        .then(course => {
            res.status(200).json({'Course':'course added successfully'});
        }).catch(err => {
        res.status(400).json('adding new course failed');
    });
});

router.route('/update/:id').post((req, res) => {
    courseModel.findById(req.params.id, (err, course) => {
        if (!course){
            res.status(404).send('data is not found');
        }
        else {
            course.course_code = req.body.course_code;
            course.course_name = req.body.course_name;
            course.course_instructor = req.body.course_instructor;
            course.course_instructor_email = req.body.course_instructor_email;

            course.save().then(course => {
                res.json('course updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    courseModel.findById(id, (err,course) => {
        if (!course){
            res.status(404).send("data is not found");
        }
        else{
            course.remove().then(admin => {
                res.json('course deleted');
            })
                .catch(err => {
                    res.status(400).send("delete not possible");
                });
        }
    });
});

module.exports = router;