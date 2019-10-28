require("dotenv").config();
import { Request, Response, Application } from "express";
import { UpdateRequest, DeleteRequest, SearchFormItem } from "~/form";
import * as HttpStatus from "http-status-codes";
import * as firestore from "./modules/firestore";

const bodyParser = require("body-parser");
const express = require("express");

const app: Application = express();
const port = 8080; // default port to listen

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// select
app.post("/select", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item: SearchFormItem = req.body;

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    const result = await firestore.fetchSelect(item);
    res.send(result);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

// update
app.post("/update", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item: UpdateRequest = req.body;

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    await firestore.update(item);
    res.send(HttpStatus.OK);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

// delete
app.post("/delete", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item: DeleteRequest = req.body;
    console.info(`/delete: req=${JSON.stringify(item, null, 2)}`);

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    await firestore.del(item);
    res.send(HttpStatus.OK);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

// start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
