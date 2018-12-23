const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const router = require("./routing/router");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/", router);

app.use(express.static(`${__dirname}/../build`));

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
  console.log(`Server listening`);
});