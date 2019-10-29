import { firestore } from "firebase-admin";
import { FIELD_TYPE, WHERE_OP } from "~/enums";
import {
  SearchFormItem,
  SearchResult,
  UpdateRequest,
  UpdateParamData,
  DeleteRequest
} from "~/form";
import admin from "./firebase";
const db = admin.firestore();

/**
 * select
 */
export async function fetchSelect(form: SearchFormItem, size: number = 100): Promise<SearchResult> {
  // set query
  let query = db.collection(form.collection).limit(size);
  if (!!form.orderField && !!form.whereField) {
    // using where and order
    query = query.where(form.whereField, form.whereOp, form.whereValue);
    query = query.orderBy(form.orderField, form.orderType);
    if (!!form.lastId) query = query.startAfter(form.lastId);
  } else if (!!form.whereField) {
    // using where only
    query = query.where(form.whereField, form.whereOp, form.whereValue);
    if (form.whereOp === WHERE_OP.EQ) {
      query = query.orderBy(admin.firestore.FieldPath.documentId());
      if (!!form.lastId) return query.startAfter(form.lastId);
    } else {
      query = query.orderBy(form.whereField);
      if (!!form.lastId) query = query.startAfter(form.lastId);
    }
  } else if (!!form.orderField) {
    // using order only
    query = query.orderBy(form.orderField, form.orderType);
    if (!!form.lastId) query = query.startAfter(form.lastId);
  } else {
    query = query.orderBy(admin.firestore.FieldPath.documentId());
    if (!!form.lastId) return query.startAfter(form.lastId);
  }

  // execute query
  const items = await query.get();

  return {
    result: items.docs.map((v: firestore.QueryDocumentSnapshot) => ({
      collection: form.collection,
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
