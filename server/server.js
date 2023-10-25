const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

app.use(bodyParser.json());
app.use(cors());

const URI = "mongodb+srv://ahshakib75:shakib0000@cluster0.6fgtdpl.mongodb.net/";

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.log(e));

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

require("./imageDetails");
const Images = mongoose.model("ImageDetails");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/src/assets");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-image", upload.single("image"), async (req, res) => {
  const imageName = req.file.filename

  try {
    await Images.create({image: imageName})
    res.status(200)
  } catch (error) {
    res.status(error)
  }
});

app.get("/get-image", async (req, res) => {
  try {
    Images.find({}).then((data) => {
      res.status(200).send({data: data})
    })
  } catch (error) {
    res.status(error)
  }
})
