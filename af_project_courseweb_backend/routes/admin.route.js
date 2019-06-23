const express = require('express');
const router = express.Router();
const adminModel = require('../DBSchema/admin.model');

router.route('/').get((req,res) => {
    adminModel.find((err, Admin) => {
        if(err){
            console.log(err);
        }else {
            res.json(Admin);
        }
    });
});

router.route('/:id').get((req,res) => {
    let id = req.params.id;
    adminModel.findById(id, (err,admin) => {
        if(!err){
            res.json(admin);
        }else {
            console.log(err);
        }
    });
});

router.route('/add').post((req,res) => {
    let admin = new adminModel(req.body);
    admin.save()
        .then(admin => {
            res.status(200).json({'admin':'admin added successfully'});
        }).catch(err => {
        res.status(400).json('adding new admin failed');
    });
});

router.route('/update/:id').post((req, res) => {
    adminModel.findById(req.params.id, (err, admin) => {
        if (!admin){
            res.status(404).send('data is not found');
        }
        else {
            admin.admin_username = req.body.admin_username;
            admin.admin_email = req.body.admin_email;
            admin.admin_password = req.body.admin_password;

            admin.save().then(admin => {
                res.json('admin updated');
            })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    });
});

router.route('/delete/:id').delete((req, res) => {
    let id = req.params.id;
    adminModel.findById(id, (err,admin) => {
        if (!admin){
            res.status(404).send("data is not found");
        }
        else{
            admin.remove().then(admin => {
                res.json('admin deleted');
            })
                .catch(err => {
                    res.status(400).send("delete not possible");
                });
        }
    });
});

module.exports = router;