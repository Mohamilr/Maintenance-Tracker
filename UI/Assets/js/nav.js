const bar = document.getElementById("bar");
const mainUl = document.getElementsByClassName("main-ul")[0];
console.log(mainUl);
bar.addEventListener("click", () => {
  mainUl.classList.toggle("nav-toggle");
});
