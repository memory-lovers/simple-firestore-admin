require("dotenv").config();
import { Request, Response, Application } from "express";
const firestore = require("./modules/firestore");

const bodyParser = require("body-parser");
const express = require("express");
const helper = require("./modules/RequestHepler");

const app: Application = express();
const port = 8080; // default port to listen

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// select
app.post("/select", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item = helper.toQueryForm(req);

    if (item == null) {
      res.status(500).send({ msg: "invalid param" });
      return;
    }

    const result = await firestore.fetchSelect(item);
    res.send(result);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(500).send({ msg: `${error}` });
    return;
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
