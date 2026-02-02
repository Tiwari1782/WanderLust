const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("../WanderLust/models/listing");
const path = require("path");
const methodOverride = require("method-override");
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

//Server
app.get("/", (req, res) => {
  res.send("Hii, I am root!!");
});
//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

//New route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route
app.post("/listings", async (req, res) => {
  // let { title, description, price, image, country, location } = req.body;
  // let listing = req.body.listing;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
  // console.log(listing);
});

//SHow route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});

//Edit route
app.get("/listings/:id/edit", async (req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});

//Update Route
app.put("/listings/:id", async (req,res) => {
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//Delete Route
app.delete("/listings/:id", async (req,res) =>{
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
})
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
app.listen(port, () => {
  console.log(`Server is Listening to port : ${port}`);
});
