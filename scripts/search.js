"use strict";

// Assign variable
const newsContainer = document.querySelector("#news-container");
const searchInput = document.querySelector("#input-query");
const pageNum = document.querySelector("#page-num");

const submitBtn = document.querySelector("#btn-submit");
const nextBtn = document.querySelector("#btn-next");
const prevBtn = document.querySelector("#btn-prev");

let currentPage = 1,
  lastPage;

// Function renders data news
function renderNews(data) {
  newsContainer.innerHTML = "";
  let html = "";
  data.articles.forEach((curr) => {
    html += `
    <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4">
              <img src="${
                curr.urlToImage
                  ? curr.urlToImage
                  : "https://cdn.nerdschalk.com/wp-content/uploads/2022/12/how-to-put-photos-side-by-side-on-iphone-759x427.png"
              }"
                    class="card-img"
                    alt=${curr.title}>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${curr.title}</h5>
              <p class="card-text">${
                curr.description ? curr.description : "N/A"
              }</p>
              <a href=${curr.url}
                  target="_black"
                  class="btn btn-primary">View</a>
              </div>
           </div>
        </div>
      </div>
    </div>`;
  });
  newsContainer.innerHTML = html;
}

// Function checks current page to demonstrate "Prev" and "Next" buttons
function checkPage(currPage) {
  if (currPage === 1) {
    prevBtn.classList.add("hidden");
  } else if (currPage === lastPage) {
    nextBtn.classList.add("hidden");
  } else {
    prevBtn.classList.remove("hidden");
    nextBtn.classList.remove("hidden");
  }
}

// Function changes page
function changePage() {
  pageNum.textContent = `${String(currentPage)} / ${String(lastPage)}`;
  checkPage(currentPage);
  getNews(currentPage);
}

// Function gets API data news
async function getNews(page) {
  const isLogin = userActive.username !== undefined;

  const url = `https://newsapi.org/v2/everything?q=${
    searchInput.value
  }&pageSize=${
    isLogin ? userActive.pageSize : 10
  }&page=${page}&apiKey=e74c26b9fe8c4189b36731549bdbfe2a`;

  try {
    const response = await fetch(url);
    const dataNews = await response.json();

    // Catch the error that requests more than 100 requests within 24 hours
    if (dataNews.status === "error") throw new Error(dataNews.message);
    renderNews(dataNews);

    // Get last page form totalResuls of news data
    lastPage = Math.ceil(
      dataNews.totalResults / (isLogin ? userActive.pageSize : 20)
    );
    pageNum.textContent = `${String(currentPage)} / ${String(lastPage)}`;

    // console.log(url);
  } catch (err) {
    alert(err.message);
  }
}

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  if (searchInput.value.trim() === "")
    return alert("Please input search keywords !!!");

  currentPage = 1;
  getNews(currentPage);
  changePage();
});

// Next button pressed
nextBtn.addEventListener("click", function () {
  if (currentPage === lastPage) return;
  currentPage++;
  changePage();
});

// Previous button pressed
prevBtn.addEventListener("click", function () {
  if (currentPage === 1) return;
  currentPage--;
  changePage();
});
