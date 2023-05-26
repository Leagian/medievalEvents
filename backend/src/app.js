const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

// use some application-level middlewares
app.use(
  cors({
    origin: process.env.FRONTEND_URL ?? "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  "/avatar",
  express.static(path.join(__dirname, "public/uploads/avatar"))
);
app.use("/image", express.static(path.join(__dirname, "public/uploads/image")));

// Serve the public folder for public resources
app.use(express.static(path.join(__dirname, "../public")));

// Serve REACT APP
app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

const router = require("./router/router");

// API routes
app.use("/api", router);

// Redirect all requests to the REACT app
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

// ready to export
module.exports = app;
