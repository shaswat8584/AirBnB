const User = require("../models/user");

module.exports.renderRegisterForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.createUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  const newuser = new User({ email, username });
  const registeredUser = await User.register(newuser, password);
  req.login(registeredUser, (err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Welcome to AirBnB!");
    res.redirect("/listings");
  });
};

module.exports.renderLoginForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Welcome back!");
  res.redirect(res.locals.returnTo || "/listings");
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "Logged you out!");
    res.redirect("/listings");
  });
};

