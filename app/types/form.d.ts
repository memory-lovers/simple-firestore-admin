import { WHERE_OP, ORDER_TYPE, FIELD_TYPE } from "~/src/enums";

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

export interface UpdateParamData {
  field: string;
  value: any;
  type: FIELD_TYPE;
}
export type UpdateParam = UpdateParamData[];

export interface UpdateRequest {
  docId: string;
  param: UpdateParamData[];
}
