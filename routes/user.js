const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");

//GET - Signup
router.get("/signup", (req, res) => {
  res.render("users/auth.ejs");
});

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    } catch (e) {
      req.flash("error", "User already exists");
      res.redirect("/signup");
    }
  }),
);

//Login page GET route
router.get("/login", (req, res) => {
  res.render("users/auth.ejs");
});
//POST Route
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (async (req, res) => {
    req.flash("success","Welcome to WanderLust! You are logged in!!")
    res.redirect("/listings");
  }),
);
module.exports = router;
