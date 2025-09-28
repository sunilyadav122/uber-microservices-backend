const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  me,
} = require("../controllers/user.controller");
const { authenticate } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", authenticate, me);

module.exports = router;
