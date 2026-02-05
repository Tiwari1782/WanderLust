# Model : Listing
Place can be apartment, flat, house, villa, hotel, motel etc..

->Title - String type
->description - String type
->image - URL
->price - number
->loaction - String type
->country - String type

# index route 
GET - /listings -> all listings
# Read : Show route
GET /listings/:id -> all data
# Create : new and create route
GET /listings/new -> Form
POST /listings -> Submit
# update : edit and update route
GET /listings/:id/edit -> edit form -> submit
then a 
PUT /listings/:id (now it is updated)
# Delete : Delete route 
/listings/:id
# what is ejs mate?
# Creating navbar
# Form Validations
When we enter data in the form, the browser and/ or the web server will check to see that the data is in the correct format and within the constraints set by the application.
# Success and Failure text
# Defining own custom error handler
```js
//Middleware
app.use((err, req, res, next) => {
  res.send("Something went wrong!!");
});
```
# Custom Wrapsync 
here we make a folder utils in which error should be handled
file location - utils/wraPasync.js
# Custom expresserror
file location - utils/ExpressError.js
# created error.ejs
