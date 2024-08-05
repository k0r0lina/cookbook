// Titles handler

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
  titleListSelector = ".titles",
  articleTagsSelector = ".page-tags .list-horizontal";

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

// Tags generator

function generateTags() {
  const articles = document.querySelectorAll(articleSelector);

  for (let article of articles) {
    const articleTags = article.querySelector(articleTagsSelector);

    let html = "";
    const tags = article.getAttribute("data-tags").split(" ");

    for (let tag of tags) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      html = html + linkHTML;
    }
    articleTags.innerHTML = html;
  }
}
generateTags();

// Tags handler

function tagClickHandler(event) {
  event.preventDefault();
  const href = this.getAttribute("href");
  const tag = document.querySelector(href);
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  for (let activeTag of activeTags) {
    activeTag.classList.remove("active");
  }
}

function addClickListenersToTags() {
  const links = document.querySelectorAll(articleTagsSelector);

  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}
addClickListenersToTags();
