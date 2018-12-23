const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const generateDOCX = require("generate-docx");
const app = express();

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static(`${__dirname}/../build`));

app.set("port", process.env.PORT || 3000);

app.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../build/hospital.html"));
});

app.post("/hospital-generate", (request, response) => {
  const options = {
    template: {
      data: request.body,
      filePath: path.join(__dirname, "templates/hospital.docx")
    }
  };
  generateDOCX(options, (error, buf) => {
    const pathToFile = path.join(__dirname, "outputs/hospital.docx");
    fs.writeFile(pathToFile, buf, err => {
      if (!err) {
        fs.stat(pathToFile, err => {
          if (err) {
            console.log("error");
          }
          response.sendFile(pathToFile, () => {
            fs.unlink(pathToFile, () => {});
          });
        });
      }
    });
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
