# WanderLust (Airbnb-style Listings App)

A simple Airbnb-style listings web app built with **Node.js**, **Express**, **MongoDB/Mongoose**, and **EJS**.  
It supports full **CRUD** for listings (Create, Read, Update, Delete) with clean views, a shared layout (boilerplate), and custom error handling.

---

## Features

- Listings Model (Apartment/House/Villa/Hotel etc.)
- CRUD routes for Listings
- EJS templating with **layouts** (boilerplate)
- Navbar (shared across pages)
- Form validations (client-side + server-side idea)
- Success / Failure messages (flash-ready)
- Custom error handling:
  - `wrapAsync` utility
  - `ExpressError` custom class
  - `error.ejs` error page

---

## Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- EJS + EJS-Mate (layouts)
- Method-Override (PUT/DELETE support)
- Bootstrap (UI)

---

## Listing Model

**Model: `Listing`**

Fields:
- `title` → String
- `description` → String
- `image` → String (URL)
- `price` → Number
- `location` → String
- `country` → String

Example places: apartment, flat, house, villa, hotel, motel, etc.

---

## Routes (CRUD)

### Index Route (Read all)
- **GET** `/listings`  
  Shows all listings.

### Show Route (Read one)
- **GET** `/listings/:id`  
  Shows full details of a single listing.

### New + Create (Create)
- **GET** `/listings/new`  
  Shows form to create a listing.
- **POST** `/listings`  
  Creates listing in DB.

### Edit + Update (Update)
- **GET** `/listings/:id/edit`  
  Shows edit form.
- **PUT** `/listings/:id`  
  Updates listing in DB.

### Delete (Delete)
- **DELETE** `/listings/:id`  
  Deletes listing from DB.

---

## What is EJS-Mate?

**EJS-Mate** is an EJS layout engine that lets you reuse a common layout across pages.

Example usage in a view:
```ejs
<% layout("/layouts/boilerplate") %>
```

This helps keep your navbar/footer consistent on every page.

---

## Form Validations

When users submit forms, validation can happen at two levels:

- **Browser (client-side)**: checks required fields, format constraints, etc.
- **Server (backend)**: final validation before saving to DB (recommended for security)

You can add:
- HTML validations like `required`, `min`, `max`, etc.
- Mongoose validations like `required: true`, `minLength`, etc.

---

## Success & Failure Text

You can show user-friendly messages such as:
- “Listing created successfully”
- “Listing updated successfully”
- “Something went wrong”

Typically done using:
- `connect-flash` + sessions  
(or simple rendering variables)

---

## Custom Error Handling

### 1) Default error-handling middleware

```js
// Middleware
app.use((err, req, res, next) => {
  res.send("Something went wrong!!");
});
```

### 2) wrapAsync Utility

Helps you avoid writing `try/catch` in every async route.

**File:** `utils/wrapAsync.js`

Purpose:
- Wrap async route handlers
- Automatically forwards errors to Express error middleware using `next(err)`

### 3) ExpressError (Custom Error Class)

**File:** `utils/ExpressError.js`

Purpose:
- Create custom errors with `statusCode` and `message`
- Makes error handling cleaner and consistent

### 4) error.ejs (Error Page)

A dedicated error page to display:
- status code
- message
- stack (optional, in dev)

---

## Project Structure (Typical)

```txt
.
├── app.js
├── models/
│   └── listing.js
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── listings/
│   │   ├── index.ejs
│   │   ├── show.ejs
│   │   ├── new.ejs
│   │   ├── edit.ejs
│   │   ├── privacy.ejs        (optional)
│   │   └── terms.ejs          (optional)
│   └── error.ejs
├── public/
│   └── css/
│       └── style.css
└── utils/
    ├── wrapAsync.js
    └── ExpressError.js
```

---

## Setup & Run Locally

1. Install dependencies:
```bash
npm install
```

2. Add MongoDB connection (in `app.js`):
- Use local MongoDB or MongoDB Atlas URI.

3. Start server:
```bash
node app.js
```
or (if using nodemon)
```bash
nodemon app.js
```

4. Visit:
- `http://localhost:8080/listings`

---

## Notes / Next Improvements

- Add authentication (login/signup)
- Add image upload (Cloudinary) instead of URL
- Add reviews + ratings
- Add flash messages + better validation errors
- Add maps (location search)

---

## License

This project is for learning/practice purposes.