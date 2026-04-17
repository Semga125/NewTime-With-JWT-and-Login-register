  const token = localStorage.getItem("accessToken");

  fetch("http://localhost:10000/users/protected", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  })
  .then(res => {
    if(res.status === 403 || res.status === 401){
      return refresh()
    }
    return res.text()
  })
  .then(data => console.log(data))

  async function refresh(){
    const res = await fetch(
      "http://localhost:10000/users/refresh",
      {
        method: "POST",
        credentials: "include"
      }
    )

    const data = await res.json()

    localStorage.setItem(
      "accessToken",
      data.accessToken
    )

    location.reload()
  }