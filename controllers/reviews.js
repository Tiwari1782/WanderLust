const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

//Add review Controller
module.exports.addReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();

  // Add flash message for success
  req.flash("success", "Review added successfully!");
  // Debug: Check if flash is set
  console.log("Flash set, redirecting to:", `/listings/${listing._id}`);
  console.log("Session after flash:", req.session.flash);

  res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  // Add flash message for success
  req.flash("success", "Review deleted successfully!");
  res.redirect(`/listings/${id}`);
};
