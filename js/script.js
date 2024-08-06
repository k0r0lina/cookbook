// Titles handler
function titleClickHandler(event) {
  event.preventDefault();
  // Selectors
  const activeLinks = document.querySelectorAll(".titles a.active");
  const activeArticles = document.querySelectorAll(".pages .page.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  this.classList.add("active");

  const linkHref = this.getAttribute("href");
  const currentArticle = document.querySelector(linkHref);
  currentArticle.classList.add("active");
}

// Global selectors
const articleSelector = ".page",
  titleSelector = ".page-title",
  titleListSelector = ".titles",
  articleTagsSelector = ".page-tags .list-horizontal",
  articleAuthorSelector = ".page-author";

// Titles generator
function generateTitleLinks(customSelector = "") {
  const titleList = document.querySelector(titleListSelector);
  titleList.innerHTML = "";

  const articles = document.querySelectorAll(articleSelector + customSelector);

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

    html += linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

// Tags generator
function generateTags() {
  const articles = document.querySelectorAll(articleSelector);

  for (let article of articles) {
    const articleTags = article.querySelector(articleTagsSelector);

    let html = "";
    const tags = article.getAttribute("data-tags").split(" ");

    for (let tag of tags) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      html += linkHTML;
    }
    articleTags.innerHTML = html;
  }
}
generateTags();

// Tags handler
function tagClickHandler(event) {
  event.preventDefault();

  const href = this.getAttribute("href");
  const tag = href.replace("#tag-", "");
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove("active");
  }

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  for (let tagLink of tagLinks) {
    tagLink.classList.add("active");
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  const links = document.querySelectorAll(".page-tags .list-horizontal a");

  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}
addClickListenersToTags();

// Authors generator
function generateAuthors() {
  const articles = document.querySelectorAll(articleSelector);

  for (let article of articles) {
    const authorElement = article.querySelector(articleAuthorSelector);
    const authorName = article.getAttribute("data-author");
    authorElement.innerHTML =
      "by " + '<a href="#author-' + authorName + '">' + authorName + "</a>";
  }
}
generateAuthors();

// Authors handler
function authorClickHandler(event) {
  event.preventDefault();

  const href = this.getAttribute("href");
  const author = href.replace("#author-", "");
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove("active");
  }

  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add("active");
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll(".page-author a");

  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
