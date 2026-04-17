let time = document.querySelector(".time");

setInterval(() => {
  const now = new Date();
  time.textContent =
    String(now.getHours()).padStart(2, "0") +
    " : " +
    String(now.getMinutes()).padStart(2, "0") +
    " : " +
    String(now.getSeconds()).padStart(2, "0");
}, 1000);