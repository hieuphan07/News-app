"use strict";

// Assign variables
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");

const submitBtn = document.querySelector("#btn-submit");

let isValidate = true;

// Function checks fullfilled form
function strMustBeFilled(x, name) {
  if (x.trim() === "" && isValidate) {
    alert(`${name} must be filled!`);
    isValidate = false;
  }
}

// Function confirms input user
function confirmUser(user, pass) {
  let currentUser;
  currentUser = userArr.find((currUser) => currUser.username === user);
  if (pass !== "") {
    if (currentUser?.password === pass) {
      saveToStorage(KEY2, JSON.stringify(currentUser));
      return isValidate;
    } else {
      alert("Wrong password !!! Try again.");
      return (isValidate = false);
    }
  }
}

// Clear inputs function
function clearInput() {
  usernameInput.value = "";
  passwordInput.value = "";
}

// Submit button pressed
submitBtn.addEventListener("click", function () {
  const currUser = {
    username: usernameInput.value,
    password: passwordInput.value,
  };

  // Validate data
  function validateData(data) {
    strMustBeFilled(data.username, "Username");
    strMustBeFilled(data.password, "Password");
    confirmUser(data.username, data.password);
    return isValidate;
  }

  let validate = validateData(currUser);
  if (validate) {
    clearInput();
    window.location.href = "../index.html";
  }

  isValidate = true;
});
