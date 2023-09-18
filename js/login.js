'use strict'

import config from "../config.json" assert {type: "json"}
const API_URL = config.API_URL;
const ADDITIONAL_HASH = config.ADDITIONAL_HASH;

const email = document.getElementById('email')
const password = document.getElementById('password')
const check_btn = document.getElementById('check-btn')
const login_btn = document.getElementById('login-btn')

async function comparePasswords(plainTextPassword, hashedPassword) {
  if (typeof dcodeIO !== "undefined" && typeof dcodeIO.bcrypt !== "undefined") {
    const bcrypt = dcodeIO.bcrypt;

    try {
      const isMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(plainTextPassword, hashedPassword, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });

      return isMatch;
    } catch (error) {
      console.error("Error comparing passwords:", error);
      return false;
    }
  } else {
    console.error("bcrypt.js library not available.");
    return false;
  }
}

async function getUserByEmail(email) {
    try {
        const apiUrl = `${API_URL}/UserCredentials/GetUserByEmail?email=${email}`;
        const response = await fetch(apiUrl);

        if (!response.ok) return null
        const userData = await response.json();
        return userData;

    } catch (error) {
        return null;
    }
}

function hashPassword(password) {
    return new Promise((resolve, reject) => {
        if ( typeof dcodeIO !== "undefined" && typeof dcodeIO.bcrypt !== "undefined") {
        const bcrypt = dcodeIO.bcrypt;

        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
            reject(err);
            return null;
            }

            bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                reject(err);
                return null;
            }
            resolve(hash); // Return the generated hash
            });
        });
        } else {
            reject(new Error("bcrypt.js library not available."));
            return null;
        }
    });
}

login_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    if (email.value.trim() === "" || password.value.trim() === "" || !check_btn.checked) {
        alert("Please enter all the details and select the remember me option")
    }
    else {
        const email_value = email.value.trim()
        const user_data = await getUserByEmail(email_value)
        if (user_data.length === 0) {
            alert("User is not registered. Please register before login");
        }
        else {
            const plain_password = password.value.trim() + ADDITIONAL_HASH
            comparePasswords(plain_password, user_data[0].password).then(
              (isMatch) => {
                if (isMatch) {
                    alert("Login Successful")
                    window.location = "../regs.html"
                } else {
                    alert("Password does not match.");
                }
              }
            );
        }
    }
})