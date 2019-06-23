const express = require('express');
const router = express.Router();
const instructorModel = require('../DBSchema/instructor.model');

router.route('/').get((req,res) => {
    instructorModel.find((err, Instructor) => {
        if(err){
            console.log(err);
        }else {
            res.json(Instructor);
        }
    });
});

router.route('/:id').get((req,res) => {
    let id = req.params.id;
    instructorModel.findById(id, (err,instructor) => {
        if(!err){
            res.json(instructor);
        }else {
            console.log(err);
        }
    });
});

router.route('/add').post((req,res) => {
    let instructor = new instructorModel(req.body);
    instructor.save()
        .then(instructor => {
            res.status(200).json({'Instructor':'instructor added successfully'});
        }).catch(err => {
        res.status(400).json('adding new instructor failed');
    });
});

router.route('/update/:id').post((req, res) => {
    instructorModel.findById(req.params.id, (err, instructor) => {
        if (!instructor){
            res.status(404).send('data is not found');
        }
        else {
            instructor.instructor_username = req.body.instructor_username;
            instructor.instructor_email = req.body.instructor_email;
            instructor.instructor_password = req.body.instructor_password;

            instructor.save().then(admin => {
                res.json('instructor updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    instructorModel.findById(id, (err,instructor) => {
        if (!instructor){
            res.status(404).send("data is not found");
        }
        else{
            instructor.remove().then(admin => {
                res.json('instructor deleted');
            })
                .catch(err => {
                    res.status(400).send("delete not possible");
                });
        }
    });
});

module.exports = router;