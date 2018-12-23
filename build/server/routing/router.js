"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs = require("fs");
const generateDOCX = require("generate-docx");
exports.router = express.Router();
exports.router.get("/", (request, response) => {
    response.sendFile(path.resolve(__dirname, "../../build/hospital.html"));
});
exports.router.post("/hospital-generate", (request, response) => {
    const options = {
        template: {
            data: request.body,
            filePath: path.resolve(__dirname, "../templates/hospital.docx")
        }
    };
    generateDOCX(options, (error, buf) => {
        if (error) {
        }
        else {
            fs.writeFile(path.resolve(__dirname, "../outputs/hospital.docx"), buf, err => {
                if (!err) {
                    response.download(path.resolve(__dirname, "../outputs/hospital.docx"));
                    fs.stat(path.resolve(__dirname, "../outputs/hospital.docx"), err => {
                        if (err) {
                            console.log("error");
                        }
                        fs.unlink(path.resolve(__dirname, "../outputs/hospital.docx"), () => { });
                    });
                }
            });
        }
    });
});
//# sourceMappingURL=router.js.map