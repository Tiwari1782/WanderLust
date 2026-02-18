const Listing = require("../models/listing.js");
const mbxStyles = require("@mapbox/mapbox-sdk/services/styles");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const { query } = require("express");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });


//Index controller with SORTING
module.exports.index = async (req, res) => {
  const { sort } = req.query;
  
  let sortOption = {};
  
  // Determine sort option
  switch(sort) {
    case 'price-low':
      sortOption = { price: 1 }; // Ascending
      break;
    case 'price-high':
      sortOption = { price: -1 }; // Descending
      break;
    case 'newest':
      sortOption = { createdAt: -1 }; // Newest first
      break;
    default:
      sortOption = { createdAt: -1 }; // Default: newest
  }
  
  const allListings = await Listing.find({}).sort(sortOption);
  res.render("listings/index", { allListings, sort: sort || 'default' });
};

//Filter by Category Controller with SORTING
module.exports.filterByCategory = async (req, res) => {
  const { category } = req.params;
  const { sort } = req.query;
  
  let sortOption = {};
  
  switch(sort) {
    case 'price-low':
      sortOption = { price: 1 };
      break;
    case 'price-high':
      sortOption = { price: -1 };
      break;
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }
  
  const allListings = await Listing.find({ category: category }).sort(sortOption);
  
  if (allListings.length === 0) {
    req.flash("error", `No listings found in "${category}" category`);
    return res.redirect("/listings");
  }
  
  res.render("listings/index", { allListings, selectedCategory: category, sort: sort || 'default' });
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

//Search route controller - FIXED: Added sort parameter
module.exports.searchListing = async (req, res) => {
  const { q, sort } = req.query;

  let sortOption = {};
  
  switch(sort) {
    case 'price-low':
      sortOption = { price: 1 };
      break;
    case 'price-high':
      sortOption = { price: -1 };
      break;
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    default:
      sortOption = { createdAt: -1 };
  }

  const listings = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } },
      { country: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ],
  }).sort(sortOption);

  res.render("listings/index.ejs", { allListings: listings, sort: sort || 'default' });
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