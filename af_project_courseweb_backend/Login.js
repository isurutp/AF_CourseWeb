let Admin = require('./admin');
let Instuctor = require('./insturctor');
let Student = require('./student');




//check that a username and password are valid and then returns ture or false along with the type of user
function validate(username, password, res){
      Admin.findOne({ id: username  }, (err,admin) => {
        if(admin != null){
          if (password.trim() === admin.student_password.trim()){
            res.status(200).send({validated:true,type:"admin"});
          }else{
            res.status(200).send({validated:false,type:"admin"});
          }
        }else {
          Student.findOne({  student_id: username  }, (err,student) => {
            if(student != null){
              if (password.trim() === student.student_password.trim()){
               res.status(200).send({validated:true,type:"student"});
             }else{
               res.status(200).send({validated:false,type:"student"});
             }
           }else{
             Instuctor.findOne({ id: , username }, (err,instuctor) => {
               if(instuctor != null){
                 if (password.trim() === instuctor.student_password.trim()){
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
