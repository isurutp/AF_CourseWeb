const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Course = new Schema({
    course_code:{
        type: String
    },
    course_name:{
        type: String
    },
    course_instructor:{
        type: String
    },
    course_instructor_email:{
        type: String
    }
});

module.exports = mongoose.model('Course', Course);