const bar = document.getElementById("bar");
const mainUl = document.getElementsByClassName("main-ul")[0];

bar.addEventListener("click", () => {
  mainUl.classList.toggle("nav-toggle");
});