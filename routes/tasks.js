const express = require("express");
const router = express.Router();

const {
  postUser,
  loginUser,
  getTasks,
  refreshToken
} = require("./controlers.js");

const auth = require("../middleware/auth");


router.post("/", postUser);


router.post("/login", loginUser);


router.post("/refresh", refreshToken);


router.get("/protected", auth, getTasks);

module.exports = router;
