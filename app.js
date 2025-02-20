const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const adminRouter = require("./routes/adminRouter");
const { upload } = require("./controllers/adminController");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/admin", adminRouter);

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

const product = require("./models/adminModel");

app.get("/", async (req, res) => {
  const products = await product.getAllProduct();
  res.render("admin", { products });
});

app.post("/upload", upload.single("files"), (req, res) => {
  res.json({
    imageUrl: `/uploads/${req.file.filename}`,
    title: req.body.title,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
