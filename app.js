const path = require("path");

const express = require("express");

// ! Express.js Router is a valid Middleware Function!
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// * Parses Bodies sent through a FORM
// ^ and it automatically calls `next()`
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(shopRoutes);

// If an invalid URL was provided, we don't 'enter' any admin/shop Routes, thus we don't execute any Middleware, THUS we pass to this one
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// * Handle favicon.ico requests to prevent browsers from triggering middleware twice
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.listen(3000);
