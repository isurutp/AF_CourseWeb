

class Validator{

}


//validation function for username
// Validator.prototype.validateUsername = (value) => {
//
// // uesrname format correct
//  const usernamePattern = new RegExp(/\b[a-z][a-z]/i);
//   if (!usernamePattern.test(value) || value.length == 5 )
//     return -1;
//
//   const patternAdmin = new RegExp(/\bAd/i);
//   const patternStudent = new RegExp(/\bSt/i);
//   const patternInstructor = new RegExp(/\bIn/i);
//
//   if (patternAdmin.test(value))
//     return 0;
//   else if(patternStudent.test(value))
//     return 1;
//   else if(patternInstructor.test(value))
//     return 2;
//   else
//     return -99;
//
//
//
// }


Validator.prototype.validateUsername = (value) => {
  if (value.length < 11){
    return true;
  }else{
    return false;
  }
}



Validator.prototype.validateEmail = (value) => {
  //if email structure is valid
  const patternFirstChar = new RegExp(/\b[A-Z]/i);//make sure first charactor is letter
  const patternNameSymbol = new RegExp(/[!#$%&'*+-/=?^_`{|]/g);//find a Symbol in name
  const patternName = new RegExp(/[^A-z0-9]/ig); //find if any non-letter and non-number charactors are present
  const patternDomain = new RegExp(/[^A-Z0-9._]/i);//find if any non-letter and non-number charactors that are not . and _  are present
  const patterntopLevelDomain = new RegExp(/[A-Z0-9][.][A-Z]/i);// find if there is an match to top level domain
  const patternDomainDotDot = new RegExp(/[._][._]/);//find if any _ or . follow eachother

  // split into Name and domain
  let index;// location of @
  let name;
  if ((index = value.indexOf("@"))== 0){
    name = "";
  }else{
    name = value.slice(0,index);
  }
  const domain = value.slice(index+1,);

  // get the first charactor of domain and name to check if it's a letter
  const domainFirstChar = value.slice(index+1,index+2);
  const nameFirstChar = value.slice(0,1);

  // get count for the number of symbols only one alowed if any
  let countSymbol;
  if (String(name).match(patternNameSymbol) == null)
    countSymbol = 0 ;
  else
     countSymbol = String(name).match(patternNameSymbol).length;

   //main if with  all conditions
   if (index != -1 && patternFirstChar.test(nameFirstChar) &&
      ((countSymbol == 1) || !patternName.test(name)) &&
      patternFirstChar.test(domainFirstChar) && !patternDomain.test(domain) &&
      patterntopLevelDomain.test(domain) && !patternDomainDotDot.test(domain)){

    return true;
  }else{

    return false;
  }

  //TODO: if email is already in the system
}

Validator.prototype.validatePasswordMatch = (value1,value2) => {
   if (value1.trim() === value2.trim()){
     return true;
   }else{
     return false;
   }
}

Validator.prototype.validatePassword = (value) => {
  const pattern = new RegExp(/[^A-Z0-9!#$%&_?]/i);
  value = String(value);
  if( (value.length < 20 ) && !(pattern.test(value))){
    return true;
  }else{
    return false;
  }
}

Validator.prototype.validateName = (value) => {
  const pattern = new RegExp(/[^A-Za-z]/i);
//!pattern.test(value) &&
  if (value.lenght < 40){
      return true;
  }else{
    return false;
  }
}

Validator.prototype.validateNumber = (value ) =>{
  value = Number(value);
  if (value <= 100 && value >= 0){
      return true;
  }else{
    return false;
  }
}




Validator.prototype.validateCourseCode = (value) => {
  const pattern = new RegExp(/[A-Z][A-Z][0-9][0-9][0-9][0-9]/i);
  if (pattern.test(value) && (value.trim().length == 6)){
    return true;
  }else{
    return false;
  }
}




module.exports = Validator;
//export default Validator;
