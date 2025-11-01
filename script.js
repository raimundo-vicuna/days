document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach(btn => {
    if (btn.getAttribute("index") == "1") {
        btn.addEventListener("click", () => {
            window.open("../entre/main.html");
        });
    } else {
        btn.addEventListener("click", () => {
            window.open("../info/main.html");
        });
    };
    });
});
