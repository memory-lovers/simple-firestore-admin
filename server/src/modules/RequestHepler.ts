import { Request } from "express";
import { SearchFormItem } from "../../../app/types/form";

class RequestHepler {
  public toQueryForm(req: Request): SearchFormItem | null {
    if (!req.body.collection) return null;
    const item: SearchFormItem = { collection: req.body.collection };
    if (!!req.body.whereField && !!req.body.whereOp && !!req.body.whereValue) {
      item.whereField = req.body.whereField;
      item.whereOp = req.body.whereOp;
      item.whereValue = req.body.whereValue;
    }

    if (!!req.body.orderField && !!req.body.orderType) {
      item.orderField = req.body.orderField;
      item.orderType = req.body.orderType;
    }

    if (!!req.body.lastId) {
      item.lastId = req.body.lastId;
    }
    return item;
  }
}

const helper = new RequestHepler();
module.exports = helper;
