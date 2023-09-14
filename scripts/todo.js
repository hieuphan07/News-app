"use strict";

const todoList = document.querySelector("#todo-list");
const taskInput = document.querySelector("#input-task");

const addBtn = document.querySelector("#btn-add");

// Function checks fullfilled form
function strMustBeFilled(x, name) {
  let isValidate = true;
  if (x.trim() === "" && isValidate) {
    alert(`${name} must be filled!`);
    isValidate = false;
  }
  return isValidate;
}

// Function deletes task
function deleteTask() {
  document.querySelectorAll("#todo-list li").forEach((liEl) => {
    liEl.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("close")) {
        todoArr.map((curr, index) => {
          if (curr.task === liEl.textContent.slice(0, -1)) {
            todoArr.splice(index, 1);
            saveToStorage(KEY3, JSON.stringify(todoArr));
            renderTask(todoArr);
          }
        });
      }
    });
  });
}

// Function changes status "isDone" of task
function isDoneTask() {
  document.querySelectorAll("#todo-list li").forEach((liEl) => {
    liEl.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.classList.contains("close")) return;
      liEl.classList.toggle("checked");
      todoArr.map((curr) => {
        if (curr.task === liEl.textContent.slice(0, -1)) {
          curr.isDone ? (curr.isDone = false) : (curr.isDone = true);
          saveToStorage(KEY3, JSON.stringify(todoArr));
        }
      });
    });
  });
}

// Function renders tasks
function renderTask(arr) {
  let liHtml = "";
  arr
    .filter((curr) => curr.owner === userActive.username)
    .forEach((curr) => {
      liHtml += `<li class=${curr.isDone ? "checked" : ""}>${
        curr.task
      }<span class="close">x</span></li>`;
    });
  todoList.innerHTML = liHtml;

  isDoneTask();
  deleteTask();
}

// Check active user
if (userActive.username !== undefined) {
  renderTask(todoArr);

  // Add button pressed
  addBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const task = new Task(taskInput.value, userActive.username, false);

    if (strMustBeFilled(task.task, "Task")) {
      todoArr.push(task);
      saveToStorage(KEY3, JSON.stringify(todoArr));
      taskInput.value = "";
      renderTask(todoArr);
    }
  });
} else {
  addBtn.addEventListener("click", function () {
    alert("Please login first !!!");
  });
}
