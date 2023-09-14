"use strict";

// Assign varaible
const firstNameInput = document.querySelector("#input-firstname");
const lastNameInput = document.querySelector("#input-lastname");
const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const passwordConfirmInput = document.querySelector("#input-password-confirm");

const submitBtn = document.querySelector("#btn-submit");

let isValidate = true;

// Function checks fullfilled form
function strMustBeFilled(x, name) {
  if (x.trim() === "" && isValidate) {
    alert(`${name} must be filled!`);
    isValidate = false;
  }
}

// Function checks unique value
function mustBeUnique(uniq) {
  if (uniq !== "") {
    for (let i = 0; i < userArr.length; i++) {
      if (uniq === userArr[i].username) {
        alert("username must be unique!");
        isValidate = false;
        break;
      }
    }
  }
}

// Function checks passwords
function checkPassword(input) {
  if (input !== "" && input.length >= 8) {
    return isValidate;
  } else {
    isValidate = false;
    alert("Password must have at least 8 characters !!!");
  }
}

// Function compares passwords
function comparePasswords(ip1, ip2) {
  if (ip2 !== "")
    ip1 === ip2
      ? isValidate
      : ((isValidate = false),
        alert("Those passwords didn't match. Try again."));
}

// Clear inputs function
function clearInput() {
  firstNameInput.value = "";
  lastNameInput.value = "";
  usernameInput.value = "";
  passwordInput.value = "";
  passwordConfirmInput.value = "";
}

// Register button pressed
submitBtn.addEventListener("click", function () {
  const user = new User(
    firstNameInput.value,
    lastNameInput.value,
    usernameInput.value,
    passwordInput.value
  );

  // Validate data
  const validateData = function (user) {
    // Form must be fullfilled
    strMustBeFilled(user.firstName, "First Name");
    strMustBeFilled(user.lastName, "Last Name");
    strMustBeFilled(user.username, "Username");
    strMustBeFilled(user.password, "Password");
    strMustBeFilled(passwordConfirmInput.value, "Confirm Password");
    // Username must be unique
    mustBeUnique(user.username);
    // Passwords must be matched
    checkPassword(user.password);
    comparePasswords(user.password, passwordConfirmInput.value);

    return isValidate;
  };

  let validate = validateData(user);
  if (validate) {
    clearInput();
    users.push(user);
    saveToStorage(KEY1, JSON.stringify(users));
    window.location.href = "../pages/login.html";
  }

  // Reset validated value after failed attempt
  isValidate = true;
});
