
const jwt = require("jsonwebtoken")
const auth = (req,res,next) => {
  const header = req.headers.authorization

  if (!header){
    return res.status(401).send("No token");
  }

  const token = header.split(" ")[1]
  if (!token){
     console.log("NO TOKEN AFTER SPLIT");
    return res.status(401).send("No token");
  }

  try{
    const user = jwt.verify(token,process.env.JWT_ACCESS_SECRET)

    req.user = user;
    next()
  }
  catch(err){
        console.log("JWT ERROR:", err.message);
    return res.status(403).send("Invalid token");


    
  }
}
module.exports = auth;