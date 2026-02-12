const express = require("express");
const router = express.Router({ mergeParams: true });
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleware.js");

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
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      });
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
  savedRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  async (req, res) => {
    req.flash("success", "Welcome to WanderLust! You are logged in!!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
  },
);
//Logout
router.get("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You are now Logged Out");
    res.redirect("/listings");
  });
});
module.exports = router;
