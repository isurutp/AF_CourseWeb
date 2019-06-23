const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Instructor = new Schema({
    instructor_username:{
        type: String
    },
    instructor_email:{
        type: String
    },
    instructor_password:{
        type: String
    }
});

module.exports = mongoose.model('Instructor', Instructor);