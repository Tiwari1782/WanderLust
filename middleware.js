const Listing = require("./models/listing.js");
const { listingSchema } = require("./schema.js");
const ExpressError = require("./utils/ExpressError.js");
const Review = require("./models/review.js");
const { reviewSchema } = require("./schema.js");

//If the user is logged In
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {

    // Save redirect URL ONLY for GET requests
    if (req.method === "GET") {
      req.session.redirectUrl = req.originalUrl;
    }

    req.flash("error", "You must be logged in!");
    return res.redirect("/login");
  }
  next();
};


//Redirecting the URL
module.exports.savedRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    // If redirectUrl contains _method=DELETE or PUT, redirect to listings instead
    if (req.session.redirectUrl.includes("_method=")) {
      res.locals.redirectUrl = "/listings";
    } else {
      res.locals.redirectUrl = req.session.redirectUrl;
    }
  }
  next();
};


//If the listing is owned by owner
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this Listing!!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Validation of listing
module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Validate Review
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  }
  next();
};

//Author of review
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review) {
    req.flash("error", "Review not found!");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this Review!!");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

