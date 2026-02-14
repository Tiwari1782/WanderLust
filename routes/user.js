const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

// Signup
router.get("/signup", userController.renderSignupForm);
router.post("/signup", wrapAsync(userController.postSignupForm));

// Login
router.get("/login", userController.renderLoginForm);

router.post(
  "/login",
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.postLoginForm
);

// Logout
router.get("/logout", userController.logoutUser);

module.exports = router;
