import { firestore } from "firebase-admin";
import { FIELD_TYPE, WHERE_OP } from "~/src/enums";
import {
  SelectRequest,
  SelectResponse,
  UpdateRequest,
  UpdateParamData,
  DeleteRequest
} from "~/types";
import admin from "./firebase";
const db = admin.firestore();

/**
 * select
 */
export async function fetchSelect(req: SelectRequest, size: number = 100): Promise<SelectResponse> {
  // set query
  let query = db.collection(req.collection).limit(size);
  if (!!req.orderField && !!req.whereField) {
    // using where and order
    query = query.where(req.whereField, req.whereOp, req.whereValue);
    query = query.orderBy(req.orderField, req.orderType);
    if (!!req.lastItem) query = query.startAfter(req.lastItem.data[req.orderField]);
  } else if (!!req.whereField) {
    // using where only
    query = query.where(req.whereField, req.whereOp, req.whereValue);
    if (req.whereOp === WHERE_OP.EQ) {
      query = query.orderBy(admin.firestore.FieldPath.documentId());
      if (!!req.lastItem) query = query.startAfter(req.lastItem.id);
    } else {
      query = query.orderBy(req.whereField);
      if (!!req.lastItem) query = query.startAfter(req.lastItem.data[req.whereField]);
    }
  } else if (!!req.orderField) {
    // using order only
    query = query.orderBy(req.orderField, req.orderType);
    if (!!req.lastItem) query = query.startAfter(req.lastItem.data[req.orderField]);
  } else {
    query = query.orderBy(admin.firestore.FieldPath.documentId());
    if (!!req.lastItem) query = query.startAfter(req.lastItem.id);
  }

  // execute query
  const items = await query.get();

  return {
    result: items.docs.map((v: firestore.QueryDocumentSnapshot) => ({
      collection: req.collection,
      id: v.id,
      data: v.data(),
      createAt: v.createTime,
      updateAt: v.updateTime
    }))
  };
}

function getFieldValue(data: UpdateParamData) {
  return data.value;
}

/**
 * update
 */
export async function update(req: UpdateRequest) {
  const docRef = db.collection(req.collection).doc(req.docId);
  const param = req.param.reduce((acc, v) => {
    acc[v.field] = getFieldValue(v);
    return acc;
  }, {});
  console.info(`updateParam: ${JSON.stringify(param, null, 2)}`);
  await docRef.update(param);
}

/**
 * delete
 */
export async function del(req: DeleteRequest) {
  const docRef = db.collection(req.collection).doc(req.docId);
  await docRef.delete();
}
