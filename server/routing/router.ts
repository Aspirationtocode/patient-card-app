import * as express from "express";
import * as path from "path";

export const router = express.Router();

router.get("/", (request, response) => {
  response.sendFile(path.resolve(__dirname, "../../build/hospital.html"));
});

router.get("/test", (request, response) => {
  response.send("sadas");
});
