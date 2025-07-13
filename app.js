const path = require("path");

const express = require("express");
// const { engine } = require("express-handlebars");

// ! Express.js Router is a valid Middleware Function!
const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

const app = express();

// app.engine(
//   "hbs",
//   engine({
//     layoutsDir: "views/layouts",
//     defaultLayout: "main-layout",
//     extname: ".hbs", // ext for layouts
//   })
// ); // layoutsDir default - 'views/layout', so we dont have to add it there
// app.set("view engine", "hbs"); // handlebars
// app.set("view engine", "pug"); // pug

app.set("view engine", "ejs"); // ejs
app.set("views", "views"); // default - `process path + "/views"` - so we don't have to add it there

// * Parses Bodies sent through a FORM
// ^ and it automatically calls `next()`
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminData.router);
app.use(shopRoutes);

// If an invalid URL was provided, we don't 'enter' any admin/shop Routes, thus we don't execute any Middleware, THUS we pass to this one
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "404 Not Found!", path: "/" });
});

// * Handle favicon.ico requests to prevent browsers from triggering middleware twice
app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.listen(3000);
