import { firestore } from "firebase-admin";
import { SearchFormItem, SearchResult } from "../../../app/types/form";
const admin = require("./firebase");
const db = admin.firestore();

exports.fetchSelect = async function(
  form: SearchFormItem,
  size: number = 100
): Promise<SearchResult> {
  // set query
  let query = db.collection(form.collection).limit(size);
  if (!!form.orderField) {
    query = query.orderBy(form.orderField, form.orderType);
    if (!!form.lastId) query = query.startAfter(form.lastId);
  } else {
    query = query.orderBy(admin.firestore.FieldPath.documentId());
    if (!!form.lastId) return query.startAfter(form.lastId);
  }

  if (!!form.whereField) {
    query = query.where(form.whereField, form.whereOp, form.whereValue);
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
};
