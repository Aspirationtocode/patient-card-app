import * as express from "express";
import * as bodyParser from "body-parser";
import { router } from "./routing/router";
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use("/", router);

app.use(express.static(`${__dirname}/../build`));

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
