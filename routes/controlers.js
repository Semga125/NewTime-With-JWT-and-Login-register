const db = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


  const GenerateTokens = (user) => {
  const accessToken = jwt.sign(
    {id: user.id},
    process.env.JWT_ACCESS_SECRET,
    {expiresIn: "15m"}
  )
    const refreshToken = jwt.sign(
    {id: user.id},
    process.env.JWT_REFRESH_SECRET,
    {expiresIn: "30d"}
  )
  return {accessToken,refreshToken}
  }
const postUser = async (req, res) => {
  try {
    console.log(" postUser called with body:", req.body);

    const { login, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      "INSERT INTO backend (login,password) VALUES (?,?)",
      [login, hashedPassword]
    );

    console.log("✅ User inserted with ID:", result.insertId);

    const user = {
      id: result.insertId,
      login
    };

    const tokens = GenerateTokens(user);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    console.log("🎟 Tokens generated:", tokens);

    res.json({
      accessToken: tokens.accessToken
    });

  } catch (err) {
    console.error("❌ postUser error:", err.message);
    res.status(500).send("Error");
  }
};

const loginUser = async (req, res) => {

  try {

    const { login, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM backend WHERE login = ?",
      [login]
    );

    if (!rows.length) {
      return res.status(400).send("Invalid");
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).send("Invalid");
    }
    const tokens = GenerateTokens(user);
res.cookie(
"refreshToken",
tokens.refreshToken
)



 res.json({
accessToken:tokens.accessToken
})

  } catch (err) {
    res.status(500).send("Error");
  }

};


const getTasks = (req, res) => {
  res.send("Protected route");
};


const refreshToken = (req, res) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).send("No refresh token");
    }

    
    const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    
    const accessToken = jwt.sign(
      { id: user.id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });

  } catch (err) {
    console.log("JWT ERROR:", err.message);
    return res.status(403).send("Invalid refresh token");
  }
};




module.exports = {
  postUser,
  loginUser,
  getTasks,
  refreshToken
};
