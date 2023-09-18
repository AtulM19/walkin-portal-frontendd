'use strict'

import config from "../config.json" assert { type: "json" };
const API_URL = config.API_URL
const ADDITIONAL_HASH = config.ADDITIONAL_HASH


const email = document.getElementById('email')
const password = document.getElementById('password')
const confirm_password = document.getElementById('confirm-password')
const register_btn = document.getElementById('register-btn')

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

async function getUserByEmail(email) {
    try {
        const apiUrl = `${API_URL}/UserCredentials/GetUserByEmail?email=${email}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

async function createUser(user) {
    const userCreds = JSON.stringify(user);
    try {
        const response = await fetch(
        "https://localhost:7205/UserCredentials/CreateUserCredentials/",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: userCreds,
        });

        if (!response.ok) {
            alert("Network response was not ok");
        }
        if(response.ok) {
            alert("User created successfully. You can login now");
            window.location = "../login.html"
        }
    } catch (error) {
            alert("Fetch error: Internal Server Error", error);
    }
}


register_btn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (email.value.trim() === "" || password.value.trim() === "" || confirm_password.value.trim() === "") {
        alert("Please fill all the credentials")
    }
    else if (password.value !== confirm_password.value) {
        alert("Password and confirm password do not match")
    }
    else {
        const details = await getUserByEmail(email.value.trim())
        if (details.length !== 0) {
            alert("Email already in use")
        }
        else {
            const password_hash = await hashPassword(password.value.trim() + ADDITIONAL_HASH);
            if (password_hash === null) {
                alert("Error 500 Please Try Again")
            }
            else {
                const user = {
                    email: email.value.trim(),
                    password: password_hash
                }
                createUser(user);
            }            
        }
    }
})

