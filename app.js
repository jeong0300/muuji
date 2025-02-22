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

  const formattedProducts = products.map((product) => {
    if (typeof product.price === "string") {
      product.price = Number(product.price);
    }
    product.price = product.price.toLocaleString("ko-KR");
    return product;
  });

  res.render("admin", { products: formattedProducts });
});

app.get("/muuji", (req, res) => {
  console.log(req);
  res.render("muuji");
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
