require("dotenv").config();

const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage }); // Configure multer to save uploaded files to the "uploads" directory

// Render form to create a new listing
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/")
  // Index Route - Show all listings
  .get(wrapAsync(listingController.index))
  // Create listing Route
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

router
  .route("/:id")
  // Show a specific listing
  .get(wrapAsync(listingController.showListing))
  // Update a listing
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  // Delete a listing recommended to use a form with method POST and override it to DELETE using method-override
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));


// Render form to edit a listing
router.get(
  "/:id/edit",
  isLoggedIn,
  wrapAsync(listingController.renderEditForm),
);

module.exports = router;
