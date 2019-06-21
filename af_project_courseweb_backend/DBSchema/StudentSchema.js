const mongoose = require('mongoose');
const schema = mongoose.Schema ;

let StudentList = new schema({
    student_id : {
        type: String,
        required: true
    },
    student_email : {
        type: String,
        required: true
    },
    student_password : {
        type: String,
        required: true
    },
    student_courses : []
});

module.exports = mongoose.model('StudentList', StudentList);