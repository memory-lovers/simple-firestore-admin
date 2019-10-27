import { WHERE_OP, ORDER_TYPE } from "~/src/enums";

export interface SearchFormItem {
  collection: string;

  whereField?: string;
  whereOp?: WHERE_OP;
  whereValue?: string;

  orderField?: string;
  orderType?: ORDER_TYPE;
}

export interface SearchResult {
  hasNext: boolean;
  lastId: any | null;
  result: any[];
}
