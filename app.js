const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const { wrap } = require("module");
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");
const session = require("express-session");

let port = 8080;

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//Server
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

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page not found!!"));
});

//Middleware
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;

  res.status(statusCode).render("error.ejs", {
    err: { status: statusCode, message },
  });
});

//Server Start
app.listen(port, () => {
  console.log(`Server is Listening to port : ${port}`);
});


