// import bcryptjs from "bcryptjs";
const bcryptjs =  require("bcryptjs");

// Define a function that hashes and salts the password
async function hashPassword(password) {
  try {
    // Generate a salt with 10 rounds (the higher the number, the more secure but slower)
    const salt = await bcryptjs.genSalt(10);

    // Hash the password with the generated salt
    const hashedPassword = await bcryptjs.hash(password, salt);

    return hashedPassword;
  } catch (error) {
    return null;
  }
}

module.exports = {
  hashPassword
};
