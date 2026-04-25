const express = require("express");
const { loginAndGenerateUserSig } = require("../controller/userController");
const router = express.Router();

router.post("/login", loginAndGenerateUserSig);

module.exports = router;
