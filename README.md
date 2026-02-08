# WanderLust — Phase 1 & Phase 2 (Listings + Reviews)

WanderLust is an Airbnb-style listings web application built with **Node.js**, **Express**, **MongoDB/Mongoose**, and **EJS**.

This repository currently includes:

 **Phase 1:** Listings CRUD (core module)  
 **Phase 2:** Reviews system (rating + comment + timestamps + validation + delete logic)

---

## Project Status

###  Phase 1 Completed: Listings CRUD
- **Listings Model** (apartment / flat / house / villa / hotel / motel etc.)
- Full CRUD operations
- EJS views with shared layout (EJS-Mate)
- Static assets (CSS + Bootstrap)
- Method Override support
- Custom error handling with `wrapAsync` and `ExpressError`

###  Phase 2 Completed: Reviews Module
- **Review Model** with rating (1-5) + comment + timestamps
- Add Review form inside listing show page with interactive slider
- **Server-side validation** using Joi
- **Client-side validation** using Bootstrap
- Delete Review feature (individual reviews)
- Delete Listing → automatically deletes all related reviews using Mongoose middleware
- Professional review card UI with star ratings

---

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **EJS + EJS-Mate** (layout engine)
- **Joi** (server-side validation)
- **method-override** (PUT/DELETE support)
- **Bootstrap 5** (UI framework)
- **express-session** (flash messages)

---

## Data Models

### Listing Model (`models/listing.js`)

```javascript
{
  title: String (required),
  description: String,
  image: String (URL with default),
  price: Number,
  location: String,
  country: String,
  reviews: [ObjectId] (ref: Review)
}
```

### Review Model (`models/review.js`)

```javascript
{
  rating: Number (1-5, required),
  comment: String (required),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

---

## Routes

### Listings Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/listings` | View all listings |
| GET | `/listings/new` | Show create listing form |
| POST | `/listings` | Create new listing |
| GET | `/listings/:id` | Show single listing with reviews |
| GET | `/listings/:id/edit` | Show edit listing form |
| PUT | `/listings/:id` | Update listing |
| DELETE | `/listings/:id` | Delete listing (+ all reviews) |

### Reviews Routes

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/listings/:id/reviews` | Add review to listing |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete specific review |

### Other Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/privacy` | Privacy policy page |
| GET | `/terms` | Terms & conditions page |

---

## Phase 1 - Listings CRUD

### Index Route (All Listings)

```javascript
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  })
);
```

### Show Route (Listing Details)

```javascript
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs", { listing });
  })
);
```

### Create Listing

```javascript
// GET form
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

// POST new listing
app.post(
  "/listings",
  validateListing,
  wrapAsync(async (req, res) => {
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.session.success = "New listing created successfully!";
    res.redirect("/listings");
  })
);
```

### Update Listing

```javascript
// GET edit form
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
  })
);

// PUT update
app.put(
  "/listings/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.session.success = "Listing updated successfully!";
    res.redirect(`/listings/${id}`);
  })
);
```

### Delete Listing

```javascript
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.session.success = "Listing deleted successfully!";
    res.redirect("/listings");
  })
);
```

---

## Phase 2 - Reviews System
### Part(a)
#### Review Model Setup

```javascript
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  },
  { timestamps: true } // Auto-adds createdAt & updatedAt
);
```

#### Add Review

```javascript
app.post(
  "/listings/:id/reviews",
  validateReview,
  wrapAsync(async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.session.success = "Review added successfully!";
    res.redirect(`/listings/${listing._id}`);
  })
);
```

#### Delete Review

**Using MongoDB `$pull` operator to remove review reference from listing:**

```javascript
app.delete(
  "/listings/:id/reviews/:reviewId",
  wrapAsync(async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove review reference from listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Delete review document
    await Review.findByIdAndDelete(reviewId);

    req.session.success = "Review deleted successfully!";
    res.redirect(`/listings/${id}`);
  })
);
```

#### Delete Listing Middleware (Cascade Delete Reviews)

**When a listing is deleted, all associated reviews are automatically deleted:**

```javascript
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});
```

---

#### Validation

#### Server-Side Validation (Joi)

**Listing Validation:**

```javascript
const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
```

**Review Validation:**

```javascript
const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
```

#### Client-Side Validation (Bootstrap)

All forms use Bootstrap's `needs-validation` class with `novalidate` attribute for custom validation styling.

---

## Error Handling

### Custom Error Class (`utils/ExpressError.js`)

```javascript
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
```

### Async Wrapper (`utils/wrapAsync.js`)

```javascript
function wrapAsync(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
}
```

### Error Middleware

```javascript
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", {
    err: { status: statusCode, message }
  });
});
```

---

## Flash Messages

**Using express-session for success/error notifications:**

```javascript
// Middleware
app.use((req, res, next) => {
  res.locals.success = req.session.success;
  res.locals.error = req.session.error;
  delete req.session.success;
  delete req.session.error;
  next();
});
```

**Usage in routes:**

```javascript
req.session.success = "Operation completed successfully!";
```

---

## Project Structure

```
.
├── app.js                  # Main application file
├── models/
│   ├── listing.js          # Listing schema & model
│   └── review.js           # Review schema & model
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs # Shared layout
│   ├── listings/
│   │   ├── index.ejs       # All listings
│   │   ├── show.ejs        # Single listing + reviews
│   │   ├── new.ejs         # Create listing form
│   │   ├── edit.ejs        # Edit listing form
│   │   ├── privacy.ejs     # Privacy policy
│   │   └── terms.ejs       # Terms & conditions
│   └── error.ejs           # Error page
├── public/
│   └── css/
│       └── style.css       # Custom styles
├── utils/
│   ├── wrapAsync.js        # Async error handler
│   └── ExpressError.js     # Custom error class
└── schema.js               # Joi validation schemas
```

---

## Setup & Run Locally

### 1. Install Dependencies

```bash
npm install
```

### 2. Install Required Packages

```bash
npm install express mongoose ejs ejs-mate method-override joi express-session
```

### 3. Start MongoDB

**Local MongoDB:**
```bash
mongod
```

**Or use MongoDB Atlas connection string in `app.js`**

### 4. Run the Server

```bash
node app.js
```

**Or use nodemon (recommended for development):**

```bash
nodemon app.js
```

### 5. Open in Browser

```
http://localhost:8080/listings
```

---

## Features

### Phase 1 Features
-> Full CRUD for listings  
-> EJS templating with shared layouts  
-> Bootstrap UI styling  
-> Form validation (client + server)  
-> Method override for PUT/DELETE  
-> Custom error handling  
-> Static file serving  

### Phase 2 Features
-> Review model with timestamps  
-> Interactive star rating slider  
-> Add reviews to listings  
-> Display reviews with star ratings  
-> Delete individual reviews  
-> Cascade delete reviews when listing deleted  
-> Joi validation for reviews  
-> Flash messages for user feedback  
-> Professional review card UI  
-> Responsive design  



---

## License

This project is built for learning and educational purposes.

---

## Author

Built with ❤️ while learning MERN Stack

---

## Screenshots

### All Listings Page
![Listings](screenshots/listings.png)

### Single Listing with Reviews
![Show Page](screenshots/show.png)

### Add Review Form
![Review Form](screenshots/review-form.png)

---

## Contributing

This is a learning project. Feel free to fork and experiment!

---

## Acknowledgments

- **Apna College** - MERN Stack Course
- **Bootstrap** - UI Framework
- **MongoDB** - Database
- **Express.js** - Backend Framework