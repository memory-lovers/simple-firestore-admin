import { Request, Response } from "express";
import * as HttpStatus from "http-status-codes";
import { DeleteRequest, SearchFormItem, UpdateRequest } from "~/types";
import * as firestore from "./modules/firestore";

import bodyParser from "body-parser";
import express from "express";

const app = express();

// setup body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// select
app.post("/api/select", async (req: Request, res: Response) => {
  console.log(`/select: ${req.body}`);
  try {
    const item: SearchFormItem = req.body;

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    const result = await firestore.fetchSelect(item);
    console.log(`/select: result`, result);
    res.send(result);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

// update
app.post("/api/update", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item: UpdateRequest = req.body;

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    await firestore.update(item);
    console.log(`/update: OK`);
    res.send(HttpStatus.OK);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

// delete
app.post("/api/delete", async (req: Request, res: Response) => {
  console.log(req.body);
  try {
    const item: DeleteRequest = req.body;
    console.info(`/delete: req=${JSON.stringify(item, null, 2)}`);

    if (item == null) {
      res.status(HttpStatus.BAD_REQUEST).send({ msg: "invalid param" });
      return;
    }

    await firestore.del(item);
    console.log(`/delete: OK`);
    res.send(HttpStatus.OK);
  } catch (error) {
    console.error(`Error: ${error}`, error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send({ msg: `${error}` });
    return;
  }
});

export default app;
