const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

// Upload Endpoint
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
  console.log(UFileName);

  file.mv(`${__dirname}/client/public/uploads/${UFileName}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: UFileName, filePath: `/uploads/${UFileName}` });
  });
});

app.listen(5000, () => console.log("Server Started..."));
