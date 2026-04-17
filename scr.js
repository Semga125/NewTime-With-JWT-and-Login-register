const login = document.querySelector("#login5")
const password = document.querySelector("#password5")
const submit = document.querySelector("#submit5")

submit.addEventListener("click", async (e) => {

e.preventDefault()

const res = await fetch(
"http://localhost:10000/users/login",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
credentials: "include",   
body:JSON.stringify({
login:login.value,
password:password.value
})
}
)


const data = await res.json()


localStorage.setItem(
"accessToken",
data.accessToken
)


window.location.href = "home.html"

})