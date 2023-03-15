const bcrypt = require("bcrypt");

const validateUpdatePassword = async (user, newPassword, currentPassword) => {
  const { password } = user
  var response = {
    mesg: "",
    isValid: true,
  }

  //Validate if currentPassword matchs with the password saved in db
  const validatePassword = await bcrypt.compare(currentPassword, password)
  if (!validatePassword) {
    return response = {
      mesg: `The password it's not correct`,
      isValid: false,
    }
  }

  //Validate if currentPassword it's not the same of newPassword
  const validate = currentPassword === newPassword
  if (validate) {
    return response = {
      mesg: "There is not changes detected",
      isValid: false,
    }
  }

  return response
}


const hashPassword = async (password) =>{

} 

module.exports = {
  validateUpdatePassword,
}
