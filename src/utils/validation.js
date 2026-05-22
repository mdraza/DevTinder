var validator = require('validator');

const validateSignupData = (req) =>{
    const {firstName, lastName, emailId, password} = req.body;
    console.log(firstName)
    if(!firstName || !lastName){
        throw new Error("Please enter firstName and lastName")
    } else if(!validator.isEmail(emailId)){
        throw new Error("Invalid email Id, please enter correct email Id")
    } else if(!validator.isStrongPassword(password)){
        throw new Error("Please enter a strong password!")
    }
}


module.exports = {
    validateSignupData
}