const express = require("express");
const path = require("path");
const fs = require("fs");
const generateDOCX = require("generate-docx");

const router = express.Router();

router.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../build/hospital.html"));
});

router.post("/hospital-generate", (request, response) => {
  const options = {
    template: {
      data: request.body,
      filePath: path.resolve(__dirname, "../templates/hospital.docx")
    }
  };
  generateDOCX(options, (error, buf) => {
    if (error) {
    } else {
      fs.writeFile(
        path.resolve(__dirname, "../outputs/hospital.docx"),
        buf,
        err => {
          if (!err) {
            response.download(
              path.resolve(__dirname, "../outputs/hospital.docx")
            );
            fs.stat(
              path.resolve(__dirname, "../outputs/hospital.docx"),
              err => {
                if (err) {
                  console.log("error");
                }
                fs.unlink(
                  path.resolve(__dirname, "../outputs/hospital.docx"),
                  () => {}
                );
              }
            );
          }
        }
      );
    }
  });
});
module.exports = router;
