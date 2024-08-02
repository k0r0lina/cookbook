function titleClickHandler(event) {
  const activeLinks = document.querySelectorAll(".titles a.active");
  const activeArticles = document.querySelectorAll(".pages .page.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove("active");
  }
}

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
