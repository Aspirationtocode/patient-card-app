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
  response.send("s");
  const options = {
    template: {
      data: request.body,
      filePath: path.resolve(__dirname, "templates/hospital.docx")
    }
  };
  generateDOCX(options, (error, buf) => {
    if (error) {
      console.log(error);
    } else {
      fs.writeFile(
        path.resolve(__dirname, "outputs/hospital.docx"),
        buf,
        err => {
          if (!err) {
            fs.stat(path.resolve(__dirname, "outputs/hospital.docx"), err => {
              if (err) {
                console.log("error");
              }
              response.download(
                path.resolve(__dirname, "outputs/hospital.docx"),
                () => {
                  fs.unlink(
                    path.resolve(__dirname, "outputs/hospital.docx"),
                    () => {}
                  );
                }
              );
            });
          }
        }
      );
    }
  });
});

app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
