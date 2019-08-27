const bar = document.querySelector("#bar");
const mainUl = document.querySelector(".main-ul");

bar.addEventListener("click", () => {
  mainUl.classList.toggle("nav-toggle");
});