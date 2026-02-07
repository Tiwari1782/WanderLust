const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../WanderLust/models/listing");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { wrap } = require("module");
const { listingSchema } = require("./schema.js");
const Review = require("./models/review.js");
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

//Validate Listing
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
//Index Route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

//New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
app.post(
  "/listings", 
  validateListing,
  wrapAsync(async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//SHow route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  }),
);

//Edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  }),
);

//Update Route
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);


//Delete Route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }),
);
//Add Reviews
//Post route 
app.post("/listings/:id/reviews", async (req,res)=>{
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // console.log("New review saved");
  // res.send("New review saved");

  res.send(`/listings/${listing._id}`);
});

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

//Testing the Server

// app.get("/testlisting",async (req,res)=>{
//   let sampleListing = new Listing({
//     title : "My new Villa",
//     description : "By the beach",
//     price : 1200,
//     location : "9th Avenue, Miami",
//     country : "USA"
//   });

//   await sampleListing.save();
//   console.log("Sample was saved!!");

//   res.send("Successful testing")
// });
