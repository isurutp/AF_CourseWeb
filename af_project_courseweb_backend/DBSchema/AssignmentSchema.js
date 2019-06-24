const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

let Assignments = new Schema({
    assignment_name :{
        type: String,
        required : true
    },
    assignment_course :{
        type: String,
        required : true
    },
    assignment_due :{
        type: Date,
        required : true
    },
    assignment_marks :{
        type : Number,
        default : -1
    }
});

module.exports = mongoose.model('Assignments', Assignments);
