import { firestore } from "firebase-admin";
import { SearchFormItem, SearchResult } from "../../../app/types/form";
const admin = require("./firebase");

async function fetchBatch(
  db: firestore.Firestore,
  limit: number,
  queryFunc: Function,
  executeFunc: Function,
  last: any
) {
  console.info(`**    START fetchBatch: last=${last}`);

  // queryFuncを使って対象のドキュメントを取得
  const query = queryFunc(db, last);
  const items = await query.limit(limit).get();

  // ドキュメントが1つも見つからなければ、終了
  console.info(`QUERY: size=${items.size}`);
  if (items.size === 0) return;

  console.info(`EXECUTE: size=${items.size}`);
  await executeFunc(items.docs);

  // リストの最後の要素を取得して、再帰実行
  const lastItem = items.docs[items.size - 1];
  console.info(`EXECUTE: lastItem=${lastItem.id}, ${lastItem.timestamp}`);
  await fetchBatch(db, limit, queryFunc, executeFunc, lastItem);
}

exports.fetchData = async function(
  form: SearchFormItem,
  size = 1000,
  startTime = undefined
): Promise<SearchResult> {
  let result: any[] = [];
  const queryFunc = (db: firestore.Firestore, last: firestore.QueryDocumentSnapshot) => {
    let ref = db.collection(form.collection);

    let query;
    if (!!form.orderField) {
      query = ref.orderBy(form.orderField, form.orderType);
      if (!!last) query = query.startAfter(last.data()[form.orderField]);
    } else {
      query = ref.orderBy(admin.firestore.FieldPath.documentId());
      if (!!last) return query.startAfter(last.id);
    }

    if (!!form.whereField) {
      query = query.where(form.whereField, form.whereOp, form.whereValue);
    }
    return query;
  };

  const executeFunc = async (items: any[]) => result.push(...items);
  await fetchBatch(admin.firestore(), size, queryFunc, executeFunc, startTime);

  const hasNext = result.length > size;
  let lastId = null;
  if (hasNext) {
    if (!!form.orderField) lastId = result[result.length - 1][form.orderField];
    else lastId = result[result.length - 1].id;
  }
  return {
    hasNext: hasNext,
    lastId: lastId,
    result: result.map(v => v.data())
  };
};
