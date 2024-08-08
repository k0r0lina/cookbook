/* Titles handler */

function titleClickHandler(event) {
  event.preventDefault();

  // Selectors
  const activeLinks = document.querySelectorAll(".titles a.active");
  const activeArticles = document.querySelectorAll(".pages .page.active");

  // Remove class active
  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }

  // Add class active
  this.classList.add("active");

  const linkHref = this.getAttribute("href");
  const currentArticle = document.querySelector(linkHref);
  currentArticle.classList.add("active");
}

/* Global selectors */

const articleSelector = ".page",
  titleSelector = ".page-title",
  titleListSelector = ".titles",
  articleTagsSelector = ".page-tags .list-horizontal",
  articleAuthorSelector = ".page-author",
  tagsListSelector = ".tags.list",
  authorsListSelector = ".authors.list",
  cloudClassCount = 5,
  cloudClassPrefix = "tag-size-";

/* Titles generator */

function generateTitleLinks(customSelector = "") {
  // Selectors
  const titleList = document.querySelector(titleListSelector);
  titleList.innerHTML = "";

  const articles = document.querySelectorAll(articleSelector + customSelector);
  let html = "";

  // Generating title links
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

  // Add eventListeners to title links
  const links = document.querySelectorAll(".titles a");
  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}
generateTitleLinks();

/* Calculate Tags Param */

function calculateTagsParams(tags) {
  // Extract tag counts into an array
  const tagCounts = Object.values(tags);

  // Find the min and max of the array
  const min = Math.min(...tagCounts);
  const max = Math.max(...tagCounts);

  const params = { min, max };

  return params;
}

/* Calculate Tag Class */

function calculateTagsClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (cloudClassCount - 1) + 1);

  return classNumber;
}

/* Tags generator */

function generateTags() {
  let allTags = {};

  // Selector
  const articles = document.querySelectorAll(articleSelector);

  // Generating tags
  for (let article of articles) {
    const articleTags = article.querySelector(articleTagsSelector);

    let html = "";
    const tags = article.getAttribute("data-tags").split(" ");

    for (let tag of tags) {
      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + "</a></li>";
      html += linkHTML;

      // Check if this link is NOT already in allTags
      if (!allTags.hasOwnProperty(tag)) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    articleTags.innerHTML = html;
  }

  // Select tags in right column
  const tagList = document.querySelector(tagsListSelector);
  const tagsParams = calculateTagsParams(allTags);

  // Generate tags
  let allTagsHTML = "";

  for (let tag in allTags) {
    const tagClass = calculateTagsClass(allTags[tag], tagsParams);

    const taglinkHTML =
      '<li><a class="tag-size-' +
      tagClass +
      '" href="#' +
      "tag-" +
      tag +
      '">' +
      tag +
      "</a></li>";

    allTagsHTML += taglinkHTML;
  }

  tagList.innerHTML = allTagsHTML;
}
generateTags();

/* Tags handler */

function tagClickHandler(event) {
  event.preventDefault();

  // Finding active tags
  const href = this.getAttribute("href");
  const tag = href.replace("#tag-", "");
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');

  // Remove class active
  for (let activeTag of activeTags) {
    activeTag.classList.remove("active");
  }

  // Selector
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

  // Add class active
  for (let tagLink of tagLinks) {
    tagLink.classList.add("active");
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  // Selector
  const links = document.querySelectorAll('a[href^="#tag-"]');

  // Add eventListener to tags
  for (let link of links) {
    link.addEventListener("click", tagClickHandler);
  }
}
addClickListenersToTags();

/* Authors generator */

function generateAuthors() {
  let allAuthors = {};

  // Selector
  const articles = document.querySelectorAll(articleSelector);

  // Generating author names
  for (let article of articles) {
    const authorElement = article.querySelector(articleAuthorSelector);
    let html = "";
    const authorNames = article.getAttribute("data-author");
    const linkHTML =
      "by " + '<a href="#author-' + authorNames + '">' + authorNames + "</a>";
    if (!allAuthors.hasOwnProperty(authorNames)) {
      allAuthors[authorNames] = 1;
    } else {
      allAuthors[authorNames]++;
    }
    html = html + linkHTML;
    authorElement.innerHTML = html;
  }
  const authorList = document.querySelector(authorsListSelector);
  let allAuthorsHTML = "";

  for (let authorName in allAuthors) {
    const authorLinkHTML =
      '<li><a href="#author-' + authorName + '">' + authorName + "</a></li>";
    allAuthorsHTML += authorLinkHTML;
  }
  authorList.innerHTML = allAuthorsHTML;
}
generateAuthors();

/* Authors handler */

function authorClickHandler(event) {
  event.preventDefault();

  // Finding all active author links
  const href = this.getAttribute("href");
  const author = href.replace("#author-", "");
  const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  // Remove class active
  for (let activeAuthor of activeAuthors) {
    activeAuthor.classList.remove("active");
  }

  // Selector for clicked author link
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

  // Add class active
  for (let authorLink of authorLinks) {
    authorLink.classList.add("active");
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  // Selector
  const authorLinks = document.querySelectorAll(".page-author a");
  const sideLinks = document.querySelectorAll(".authors.list a");

  // Add eventListener to authors
  for (let authorLink of authorLinks) {
    authorLink.addEventListener("click", authorClickHandler);
  }

  for (let sideLink of sideLinks) {
    sideLink.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
