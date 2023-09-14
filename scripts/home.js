"use strict";

// Assign variables
const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMsg = document.querySelector("#welcome-message");

const logoutBtn = document.querySelector("#btn-logout");

// Home page loading after logging
if (userActive.firstName === undefined) {
  mainContent.classList.add("hidden");
  loginModal.classList.remove("hidden");
} else {
  loginModal.classList.add("hidden");
  mainContent.classList.remove("hidden");
  welcomeMsg.textContent = `Welcome ${userActive.firstName.toUpperCase()}`;
}

// Logout button pressed
logoutBtn.addEventListener("click", function () {
  localStorage.removeItem(KEY2);
  loginModal.classList.remove("hidden");
  mainContent.classList.add("hidden");
  welcomeMsg.textContent = "";
});
