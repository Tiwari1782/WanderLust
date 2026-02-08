const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?cs=srgb&dl=beach-blue-sky-boat-88212.jpg&fm=jpg",
    set: (v) =>
      v === ""
        ? "https://images.pexels.com/photos/88212/pexels-photo-88212.jpeg?cs=srgb&dl=beach-blue-sky-boat-88212.jpg&fm=jpg"
        : v,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
