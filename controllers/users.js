const User = require("../models/user.js");

//Signup Form render
module.exports.renderSignupForm = (req, res) => {
  res.render("users/auth.ejs");
};

//Signup Form Post
module.exports.postSignupForm = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

//Login Form render
module.exports.renderLoginForm = (req, res) => {
  res.render("users/auth.ejs");
};

//Post login Form
module.exports.postLoginForm = async (req, res) => {
  req.flash("success", "Welcome to WanderLust! You are logged in!!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

//Logout user
module.exports.logoutUser = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are now Logged Out");
    res.redirect("/listings");
  });
};
