const path = require("path");

const express = require("express");

const rootDir = require("../util/path");
const adminData = require("./admin")

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log('[shop.js] In "/" middleware!', 'Products data:' , adminData.products);

  // * Default Response Header: "text/html"
  res.sendFile(path.join(rootDir, "views", "shop.html")); // ! We use path.join() so it works on Linux & Windows !!
  // res.sendFile(path.resolve("views", "shop.html")); // * We can also do it like that
});

module.exports = router;
