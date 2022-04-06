# react-exrepss-fileupload

How we can upload file with Reactjs App using exprssjs and express-fileupload ?

        In this tutorial we will learn how we can setup expressjs Server and React Application to upload images and then save that image in a folder.

You need basic Knowledge of :

- ReactJS for frontend
- expressjs for backend.

I have divided this tutorial in Two parts. In part 1 we will setup express server which will accept image and save it in a folder. And in part 2, We will create React Application and by using axios we will send image data to our API endpoint.

## Part : 01

Let's setup our express server which will provide an API endpoint and accept images as parameter then save it for later use.

1. Make an empity directory "react-express-fileupload"
2. Create a packege.json file

   Type following command in terminal :

   `npm init -y`

   This command will create a package.json file with defualt options in your root directory.

3. Install required dependencies.

   `npm i express express-fileupload`

   This command will install express and express-fileupload these are librareis that we wil use in our appliction. Express is an Application framework for backend and express-fileupload is used to accept file as parameter and save it at some location .

4. Install Dev dependency (Optional)

   `npm i nodemon concurrently -D`

   nodemon is used to restart our application when we are working in development mode. concurrently is used to run mulitple scripts with single command in our application we need two server one for backend and second for React Application. Using concurrently we will run both servers at same time.

5. Create server.js file in root directory. In this file we will write our code that will provide an endpoint and accepts file as parameter. Use following code in server.js file :

```javascript
const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
// Upload Endpoint That will accept files
app.post("/upload", (req, res) => {
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
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: UFileName, filePath: `/uploads/${UFileName}` });
  });
});
// Create an express server which will listen requests at port 5000
app.listen(5000, () => console.log("Server Started..."));

```

6. Now Updated script in packege.json file to run our server.js file.

```javascript
"scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
  }
```

7. Create React appliction by running `create-reat-app client` in root folder.

    After creation of  React application start our appliction with ```npm run dev``` command. Now we can test our Endpoint using postman.
