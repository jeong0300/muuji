const express = require("express");
const path = require("path");

const app = express();
const port = 3000;
const bodyParser = require("body-parser");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = path.basename(file.originalname, ext);
    cb(null, filename + ext);
  },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/static", express.static(path.join(__dirname, "static")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
