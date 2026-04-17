const login = document.querySelector("#login");
const password = document.querySelector("#password");
const submit = document.querySelector("#submit");

submit.addEventListener("click", async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:10000/users/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      login: login.value,
      password: password.value
    })
  });


  const data = await res.json();


  localStorage.setItem("accessToken", data.accessToken);


  window.location.href = "home.html";
});
