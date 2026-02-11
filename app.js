const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const ExpressError = require("./utils/ExpressError.js");

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

let port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

// View Engine Setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());

// Flash middleware (VERY IMPORTANT: before routes)
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
app.get("/", (req, res) => {
  res.send("Hii, I am root!!");
});

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// Privacy and Terms routes
app.get("/privacy", (req, res) => {
  res.render("listings/privacy.ejs");
});

app.get("/terms", (req, res) => {
  res.render("listings/terms.ejs");
});

// 404 handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!!"));
});

// Error handler middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).render("error.ejs", {
    err: { status: statusCode, message },
  });
});

// Server Start
app.listen(port, () => {
  console.log(`Server is Listening to port : ${port}`);
});
