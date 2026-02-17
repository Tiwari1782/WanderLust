const Listing = require("../models/listing.js");
const mbxStyles = require("@mapbox/mapbox-sdk/services/styles");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { query } = require("express");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

//Index controller
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

//New Form render Controller
module.exports.renderNewForm = (req, res) => {
  // console.log(req.user);
  res.render("listings/new.ejs");
};

//Create Listing
module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  if (!response.body.features.length) {
    req.flash("error", "Location not found! Please enter a valid location.");
    return res.redirect("/listings/new");
  }

  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = response.body.features[0].geometry;

  await newListing.save();

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};


// Show Listing controller
module.exports.showListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", {
    listing,
    mapToken: process.env.MAP_TOKEN,
  });
};

//Search route controller
module.exports.searchListing = async (req, res) => {
  const { q } = req.query;

  const listings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  });

  res.render("listings/index.ejs", { allListings: listings });
};
//Edit Listing Controller
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload/w_250");

  res.render("listings/edit.ejs", { listing });
};

//Update Listing Controller
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  // 1) Find listing first
  let listing = await Listing.findById(id);

  // 2) If location changed, re-geocode
  if (req.body.listing.location !== listing.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: `${req.body.listing.location}, ${req.body.listing.country}`,
        limit: 1,
      })
      .send();

    if (!response.body.features.length) {
      req.flash("error", "Location not found! Please enter a valid location.");
      return res.redirect(`/listings/${id}/edit`);
    }

    listing.geometry = response.body.features[0].geometry;
  }

  // 3) Update all fields manually
  listing.title = req.body.listing.title;
  listing.description = req.body.listing.description;
  listing.price = req.body.listing.price;
  listing.location = req.body.listing.location;
  listing.country = req.body.listing.country;

  // 4) Update image if new file uploaded
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }

  // 5) Save
  await listing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//Delete Listing Controller
module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
