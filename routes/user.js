const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

const { savedRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");

//Signup
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.postSignupForm));

//Login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    savedRedirectUrl,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.postLoginForm,
  );

// Logout
router.get("/logout", userController.logoutUser);

module.exports = router;
