"use strict";

// Assign variable
const pageSizeInput = document.querySelector("#input-page-size");
const categoryInput = document.querySelector("#input-category");

const submitBtn = document.querySelector("#btn-submit");

// Save setting button pressed
if (userActive.username !== undefined) {
  pageSizeInput.value = userActive.pageSize;
  categoryInput.value = userActive.category;

  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (parseInt(pageSizeInput.value) < 1 || pageSizeInput.value.trim() === "")
      return alert("Page size at least is 1");

    // Save setting to userActive
    userLogin.pageSize = parseInt(pageSizeInput.value);
    userLogin.category = categoryInput.value;
    saveToStorage(KEY2, JSON.stringify(userLogin));
    console.log(userLogin);

    // Save setting to userArr
    const index = users.findIndex(
      (curr) => curr.username === userActive.username
    );
    users[index].pageSize = userLogin.pageSize;
    users[index].category = userLogin.category;
    saveToStorage(KEY1, JSON.stringify(users));

    // Go to the News Page
    window.location.href = "../pages/news.html";
  });
} else {
  submitBtn.addEventListener("click", function (e) {
    e.preventDefault();
    alert("Please login first");
  });
}
