# WanderLust — Phase 1 (Listings CRUD)

WanderLust is an Airbnb-style listings web application built with **Node.js**, **Express**, **MongoDB/Mongoose**, and **EJS**.  
**Phase 1** focuses on building the core **Listings module**: full CRUD, templated views with a shared layout, static assets, and a clean error-handling setup.

---

## Phase 1 Scope (What’s Completed)

### ✅ Core Features
- **Listings Model** (apartment / flat / house / villa / hotel / motel etc.)
- **CRUD for Listings**
  - Create listing
  - View all listings
  - View listing details
  - Edit listing
  - Delete listing
- **EJS Views + EJS-Mate Layout**
  - Common `boilerplate` layout for consistent UI (navbar/footer)
- **Static Assets**
  - CSS served from `public/`
- **Method Override**
  - Enables `PUT` and `DELETE` via HTML forms
- **Custom Error Handling**
  - `wrapAsync` for async route error forwarding
  - `ExpressError` custom error class
  - `error.ejs` error page

---

## Tech Stack
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **EJS + EJS-Mate** (layout engine)
- **method-override** (PUT/DELETE)
- **Bootstrap** (basic UI)

---

## Data Model

### Listing (`models/listing.js`)
Fields:
- `title` → String
- `description` → String
- `image` → String (URL)
- `price` → Number
- `location` → String
- `country` → String

---

## Routes (Phase 1)

### Index (All Listings)
- **GET** `/listings`  
  Renders the index page with all listings.

### Show (Listing Details)
- **GET** `/listings/:id`  
  Renders details page for a single listing.

### New + Create
- **GET** `/listings/new`  
  Renders the “new listing” form.
- **POST** `/listings`  
  Creates a new listing and saves it to the database.

### Edit + Update
- **GET** `/listings/:id/edit`  
  Renders the edit form for an existing listing.
- **PUT** `/listings/:id`  
  Updates listing data in the database.

### Delete
- **DELETE** `/listings/:id`  
  Deletes a listing from the database.

---

## How `app.js` Works (Phase 1)

In Phase 1, `app.js` is responsible for wiring up the whole application:

### 1) Express App Setup
- Creates the Express server
- Enables parsing form data:
  - `express.urlencoded({ extended: true })`

### 2) Database Connection
- Connects to MongoDB using Mongoose
- The connection must be running for CRUD operations to work

### 3) View Engine + Layouts (EJS-Mate)
- Sets EJS as template engine
- Enables layouts so each view can use:
```ejs
<% layout("/layouts/boilerplate") %>
```

### 4) Static Files
- Serves CSS and other assets from:
- `public/`
Example: `public/css/style.css` becomes available as `/css/style.css`

### 5) Method Override
- HTML forms only support `GET` and `POST`
- `method-override` allows routes like:
  - `PUT /listings/:id`
  - `DELETE /listings/:id`
via query param `?_method=PUT` / `?_method=DELETE`

### 6) Listings Routes
- Phase 1 includes the Listings CRUD routes directly in the app (or via a router if you refactor later)
- Each route:
  - queries MongoDB (Mongoose)
  - renders an EJS view or redirects after changes

### 7) Error Handling (Important in Phase 1)
- **wrapAsync**: avoids repeating `try/catch` in every async route
- **ExpressError**: custom error object with `statusCode` + `message`
- **Error Middleware**:
  - catches errors and renders `error.ejs` (recommended) or returns a message

---

## Error Handling Utilities

### `utils/wrapAsync.js`
Wraps async route handlers so errors automatically go to the error middleware.

### `utils/ExpressError.js`
Custom error class used like:
- `throw new ExpressError(404, "Listing not found")`

### `views/error.ejs`
A dedicated error page to show:
- status code
- error message  
(optional: stack in development)

---

## Project Structure (Phase 1)

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
│   │   └── edit.ejs
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

### 1) Install Dependencies
```bash
npm install
```

### 2) Start MongoDB
- Local MongoDB: ensure the service is running  
or
- MongoDB Atlas: use your Atlas connection string in `app.js`

### 3) Run the Server
```bash
node app.js
```

(Optional, recommended during development)
```bash
nodemon app.js
```

### 4) Open in Browser
```txt
http://localhost:8080/listings
```


---

## License
This project is built for learning and educational purposes (Phase 1).