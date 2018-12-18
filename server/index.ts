import * as express from "express";
import { router } from "./routing/router";
const app = express();

app.use("/", router);

app.use(express.static(`${__dirname}/../build`));

const PORT = process.env.port || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
