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
### Part (b) & (c)

### Express Router
**Definition:** A mini Express application that handles routing for specific parts of your app, allowing you to organize routes into separate modules.

**Example:**
```javascript
const express = require("express");
const router = express.Router();

router.get("/listings", (req, res) => { /* ... */ });
router.post("/listings", (req, res) => { /* ... */ });

module.exports = router;
```

---

### Cookies
Cookies are small pieces of data stored in the user's browser that are sent with every HTTP request.

**How to send cookies:**
```javascript
// Set a cookie
res.cookie('name', 'value', { 
  maxAge: 900000,  // milliseconds
  httpOnly: true,  // accessible only by web server
  secure: false    // works on HTTP (set true for HTTPS)
});

// Read a cookie
const cookieValue = req.cookies.name;

// Clear a cookie
res.clearCookie('name');
```

**In this project:** Cookies are used to store session IDs for user sessions.

---

### Express Session
Used to store user data between HTTP requests.

```javascript
const session = require("express-session");

app.use(session({
  secret: "mysupersecretcode",    // Secret key for signing session ID
  resave: false,                   // Don't save session if unmodified
  saveUninitialized: true,         // Save new sessions
  cookie: { 
    maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days
  }
}));
```

---

### Connect-Flash
A middleware for storing temporary messages in the session to be displayed after a redirect.

**Setup:**
```javascript
const flash = require("connect-flash");

app.use(session(sessionOptions));  // Must come before flash
app.use(flash());

// Make flash messages available in all templates
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});
```

**Usage in routes:**
```javascript
// Set flash message
req.flash("success", "Review added successfully!");
res.redirect("/listings");

// Flash message automatically available in next rendered template
```

---

### Flash with Toast Notifications

Instead of traditional alert boxes, flash messages are displayed as modern toast notifications.

**Implementation:**
```js
<!-- In EJS template -->
<% if (success && success.length) { %>
  <div class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 9999;">
    <div class="toast align-items-center text-white border-0 show" 
         style="background-color: #fe424d;">
      <div class="d-flex">
        <div class="toast-body">
          <%= success[0] %>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                data-bs-dismiss="toast"></button>
      </div>
    </div>
  </div>
<% } %>
```
<script>
  // Auto-hide toasts after 5 seconds
  document.addEventListener('DOMContentLoaded', function() {
    const toasts = document.querySelectorAll('.toast');
    toasts.forEach(toast => {
      setTimeout(() => {
        const bsToast = new bootstrap.Toast(toast);
        bsToast.hide();
      }, 5000);
    });
  });
</script>
```
```
# Middleware (Authentication & Authorization) — README

This file explains the purpose of `middleware.js` used in an Express + Passport + MongoDB (Mongoose) app for **auth**, **authorization**, and **request validation**, along with security concepts like **password hashing** and **salting**.

---

### Part (d) & (e)

## 1) Authentication vs Authorization

### Authentication (AuthN)
- Answers: **“Who are you?”**
- Example: User logs in with email/username + password.
- In this project: handled using **Passport** (e.g., `req.isAuthenticated()` and `req.user`).

### Authorization (AuthZ)
- Answers: **“Are you allowed to do this?”**
- Example: Only the owner of a listing can edit/delete it.
- In this project: handled using middleware like:
  - `isOwner` (listing owner check)
  - `isReviewAuthor` (review author check)

---

## 2) Storing passwords (What to do and what NOT to do)

### Never store passwords as plain text
Bad:
- Saving the real password directly in DB.

Also bad:
- Saving encrypted passwords with a reversible key (if key leaks, all passwords leak).

### Correct approach: store a hash
- Store only a **hashed** version of the password.
- During login:
  1. Hash the entered password using the same method
  2. Compare with stored hash (or use bcrypt’s compare)

---

## 3) Hashing examples — SHA, MD5, CRC, bcrypt

### MD5
- Fast and outdated.
- Vulnerable to brute-force / rainbow table attacks.
- **Not recommended for passwords.**

### SHA-256 (often written as “SHA256”, sometimes mistaken as “SHA26”)
- Cryptographic hash, but still **too fast** for password storage.
- Attackers can brute-force quickly using GPUs.
- Better than MD5, but still **not recommended for password hashing**.

### CRC
- Not cryptographic.
- Intended for error-checking, not security.
- **Never use for passwords.**

### bcrypt (Recommended)
- Designed specifically for password hashing.
- Slow by design (configurable cost factor), making brute-force expensive.
- Includes salt handling.
- Common choice in Node.js apps.

---

## 4) Salting (Why it matters)

A **salt** is random data added to the password before hashing.

### Why salt?
Without salting:
- Two users with the same password will have the same hash.
- Attackers can use rainbow tables (precomputed hash lists).

With salting:
- Same password produces different hashes for different users.
- Greatly reduces effectiveness of precomputed attacks.

bcrypt automatically manages salts internally.

---

## 5) Creating a User Model (Concept)

A typical `User` model includes:
- username/email
- passwordHash (NOT raw password)

Many apps use **passport-local-mongoose** or manual bcrypt hashing.

Example fields:
- `username`
- `email`
- `hash` (or `password`)
- `salt` (if not using a library that manages it automatically)

---

## 6) Signup user routes — `GET /signup` and `POST /signup`

### `GET /signup`
- Shows signup form.

### `POST /signup`
- Creates a new user.
- Password handling:
  - Hash password (bcrypt or plugin)
  - Save user record
- Often auto-logins the user after successful signup.

---

## 7) Login user routes — `GET /login` and `POST /login`

### `GET /login`
- Shows login form.

### `POST /login`
- Authenticates user credentials.
- With Passport:
  - `passport.authenticate("local", ...)`
- If success:
  - Passport creates session
  - `req.user` becomes available
- If failure:
  - redirect back with flash error

---

## 8) Connecting login route — How to check if user is logged in?

Passport provides:
- `req.isAuthenticated()` → `true` if logged in
- `req.user` → current logged-in user object

In this project, login checking is done using middleware:

### `isLoggedIn`
- If not authenticated:
  - stores redirect URL (GET requests only)
  - flashes an error
  - redirects to `/login`

---

## 9) Authorization for listings and reviews (Ownership checks)

### Listing authorization
- Only the **owner** of the listing can edit/delete.
- Middleware: `isOwner`

### Review authorization
- Only the **author** of the review can delete/update.
- Middleware: `isReviewAuthor`

---

# middleware.js — What each middleware does

## 1) `isLoggedIn`
Purpose: protect routes that require login.

Behavior:
- If user is not logged in:
  - (GET only) save the requested URL in `req.session.redirectUrl`
  - show flash: “You must be logged in!”
  - redirect to `/login`
- Otherwise, call `next()`

Used in routes like:
- Create listing
- Edit listing
- Post review
- Delete review

---

## 2) `savedRedirectUrl`
Purpose: after login, redirect user back to the page they originally wanted.

Behavior:
- If session has `redirectUrl`, it copies to `res.locals.redirectUrl`
- Next middleware/route can use `res.locals.redirectUrl`

Common flow:
1. user tries to access `/listings/:id/edit`
2. `isLoggedIn` saves redirect URL and sends user to `/login`
3. after successful login, app redirects to saved URL

---

## 3) `isOwner`
Purpose: allow only listing owner to modify listing.

Behavior:
- Loads listing by `id`
- Checks:
  - `listing.owner.equals(res.locals.currUser._id)`
- If not owner:
  - flash error
  - redirect to listing page

---

## 4) `validateListing`
Purpose: validate incoming listing data (server-side validation).

Uses:
- `listingSchema` from `schema.js` (commonly Joi schema)

Behavior:
- If validation error:
  - create message from details
  - throw `ExpressError(400, errMsg)`
- else `next()`

---

## 5) `validateReview`
Purpose: validate incoming review data.

Uses:
- `reviewSchema` from `schema.js`

Behavior:
- If invalid:
  - throws `ExpressError(400, errMsg)`
- else `next()`

---

## 6) `isReviewAuthor`
Purpose: only review author can change/delete their review.

Behavior:
- Loads review by `reviewId`
- Checks:
  - `review.author.equals(req.user._id)`
- If not author:
  - flash error
  - redirect back to listing

---

# Typical usage examples (how to plug into routes)

Example patterns:

- Protect route with login:
  - `router.get("/listings/new", isLoggedIn, ...)`

- Protect route with owner authorization:
  - `router.get("/listings/:id/edit", isLoggedIn, isOwner, ...)`

- Validate listing on create/update:
  - `router.post("/listings", isLoggedIn, validateListing, ...)`

- Validate review + require login:
  - `router.post("/listings/:id/reviews", isLoggedIn, validateReview, ...)`

- Authorize review deletion:
  - `router.delete("/listings/:id/reviews/:reviewId", isLoggedIn, isReviewAuthor, ...)`

---

# Notes / Best Practices

- Always do **server-side validation** even if you have client-side validation.
- Always check **authorization** on sensitive actions (edit/delete).
- bcrypt cost factor should be chosen based on performance/security needs.
- Saving redirect URL only on GET prevents weird redirect behavior after POST requests.

```js
module.exports.isLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()){
    req.flash("error", "You must be logged in to create listing!")
    return res.redirect("/login");
  }
  next();
}
```
automatic logging in after signup - Passport has a login method automatically establishes a login session. We can invoke login to automatically login a user.
```js
router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      console.log(registeredUser);
      req.login(registeredUser, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", "Welcome to WanderLust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", "User already exists");
      res.redirect("/signup");
    }
  }),
);
```
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
![Listings](Screenshots/listings.png)

### Single Listing 
![Show Page](Screenshots/single_listing.png)

### Add Review Form
![Review Form](Screenshots/review_form.png)

---

## Contributing

This is a learning project. Feel free to fork and experiment!

---

## Acknowledgments

- **Apna College** - MERN Stack Course
- **Bootstrap** - UI Framework
- **MongoDB** - Database
- **Express.js** - Backend Framework