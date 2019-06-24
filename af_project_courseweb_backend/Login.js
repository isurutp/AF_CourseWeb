let Admin = require('./DBSchema/admin.model');
let Instuctor = require('./DBSchema/instructor.model');
let Student = require('./DBSchema/StudentSchema');




//check that a username and password are valid and then returns ture or false along with the type of user
function validate(username, password, res){
      Admin.findOne({ admin_username: username  }, (err,admin) => {
        if(admin != null){
          if (password.trim() === admin.admin_password.trim()){
            res.status(200).send({validated:true,type:"admin"});
          }else{
            res.status(200).send({validated:false,type:"admin"});
          }
        }else {
          Student.findOne({student_id: username  }, (err,student) => {
            if(student != null){
              if (password.trim() === student.student_password.trim()){
               res.status(200).send({validated:true,type:"student"});
             }else{
               res.status(200).send({validated:false,type:"student"});
             }
           }else{
             Instuctor.findOne({ instructor_username: username }, (err,instuctor) => {
               if(instuctor != null){
                 if (password.trim() === instuctor.instructor_password.trim()){
                   res.status(200).send({validated:true,type:"instuctor"});
                 }else{
                   res.status(200).send({validated:false,type:"instuctor"});
                 }
               }else{
                  res.status(200).send({validated:false,type:"not found"});
               }
             });
           }
         });
        }
      });
}

module.exports = validate;
