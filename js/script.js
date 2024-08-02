function titleClickHandler(event) {
  event.preventDefault();
  // Selectors
  const activeLinks = document.querySelectorAll(".titles a.active");
  const activeArticles = document.querySelectorAll(".pages .page.active");

  // Remove class "active"
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  // Add class "active"
  this.classList.add("active");

  const linkHref = this.getAttribute("href");
  const currentArticle = document.querySelector(linkHref);
  currentArticle.classList.add("active");
}

// Titles generator

const articleSelector = ".page",
  titleSelector = ".page-title",
  titleListSelector = ".titles";

function generateTitleLinks() {
  const titleList = document.querySelector(titleListSelector);
  titleList.innerHTML = "";

  const articles = document.querySelectorAll(articleSelector);

  let html = "";

  for (let article of articles) {
    const articleId = article.getAttribute("id");
    const articleTitle = article.querySelector(titleSelector).innerHTML;
    const linkHTML =
      '<li><a href="#' +
      articleId +
      '"><span>' +
      articleTitle +
      "</span></a></li>";

    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();
