const express = require("express");
const fileUpload = require("express-fileupload");

const app = express();

app.use(fileUpload());

// Upload Endpoint That will accept files
app.post("/upload", (req, res) => {
  // console.log(req.files);
  // Check if file is not available return message with status 400.
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;

  // We need unique file name to save it in folder and then use filename to access it. I have replace space with - and concatinated file name with Date String. We can also used uuid package as well.
  const UFileName = `${new Date().getTime()}-${file.name.replaceAll(" ", "-")}`;
  // This line of code will save our file in public/uploads folder in our
  //appliction and will retrun err if any error found if no error found then return pathname of file.
  file.mv(`${__dirname}/client/public/uploads/${UFileName}`, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json({ fileName: UFileName, filePath: `/uploads/${UFileName}` });
  });
});
// Create an express server which will listen requests at port 5000
app.listen(4000, () => console.log("Server Started..."));
