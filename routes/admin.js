const path = require("path");

const express = require("express");

const rootDir = require("../util/path");

const router = express.Router();

// ^ /admin/add-product => GET
router.get("/add-product", (req, res, next) => {
  console.log("In /add-product middleware!");

  // * Default Response Header: "text/html"
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

// ^ /admin/add-product => POST
// ! Order of middlewares is important! They must come before the "/" one (that has res.send(<h1>...</h1>))
router.post("/add-product", (req, res, next) => {
  // ^ by default, `req` doesn't try to Parse the incoming Request Body
  // to do that, we need to register a Parser (we put it before our Route-Handling middlewares)
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
