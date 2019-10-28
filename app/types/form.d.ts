import { WHERE_OP, ORDER_TYPE } from "~/src/enums";

export interface SearchFormItem {
  collection: string;

  whereField?: string;
  whereOp?: WHERE_OP;
  whereValue?: string;

  orderField?: string;
  orderType?: ORDER_TYPE;
  lastId?: any;
}

export interface ResultData {
  id: string;
  data: any;
  createAt: any;
  updateAt: any;
}

export interface SearchResult {
  result: ResultData[];
}
