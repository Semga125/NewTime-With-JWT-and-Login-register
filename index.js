const token = localStorage.getItem("accessToken");

if (!token) {
    console.log("NO TOKEN → stay on page");
} else {
    fetch("http://localhost:10000/users/protected", {
        headers: {
            Authorization: `Bearer ${token}`
        },
        credentials: "include"
    })
    .then(async (res) => {
        const text = await res.text();
        console.log("PROTECTED RESPONSE:", res.status, text);

        if (res.ok) {
            window.location.href = "home.html";
        } else {
            console.log("TOKEN INVALID → clearing");
            localStorage.removeItem("accessToken");
        }
    })
    .catch(err => console.log("FETCH ERROR:", err));
}