const express = require("express");
const router = express.Router();
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const { saveReturnTo } = require("../middleware.js");
const userController = require("../controllers/user.js");

router
  .route("/signup")
  // Render form to create a new user
  .get(userController.renderRegisterForm)
  // Create a new user
  .post(wrapAsync(userController.createUser));

router
  .route("/login")
  // Render form to login
  .get(userController.renderLoginForm)
  // Login user
  .post(
    saveReturnTo,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    userController.login,
  );
router.get("/logout", userController.logout);

module.exports = router;
