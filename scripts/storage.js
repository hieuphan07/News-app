"use strict";

// Function saves data to local storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

// Function gets data form local storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// Functions parses user data
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );
  return user;
}

// Get data user from local storage
const KEY1 = "USER_ARRAY";
const users = JSON.parse(getFromStorage(KEY1)) ?? [];
const userArr = users.map((curr) => parseUser(curr));

// Get logined user data
const KEY2 = "LOGINED_USER";
const userLogin = JSON.parse(getFromStorage(KEY2)) ?? [];
const userActive = parseUser(userLogin);

// Get task data from local storage;
const KEY3 = "TASK_ARRAY";
const todoArr = JSON.parse(getFromStorage(KEY3)) ?? [];
