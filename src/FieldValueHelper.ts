import { FIELD_TYPE } from "./enums";

export function getFieldTypeValue(type: FIELD_TYPE, value: string): any {
  if (type === FIELD_TYPE.STR) return value;
  else if (type === FIELD_TYPE.NUM) return Number(value);
  else if (type === FIELD_TYPE.BOOL) return Boolean(value);
}

export function strFieldValue(type: FIELD_TYPE, value: string | number | boolean): string {
  if (type === FIELD_TYPE.STR) return `"${value}"`;
  else return `${value}`;
}

export function findFieldType(value: string | number | boolean): FIELD_TYPE {
  if (typeof value === "string") return FIELD_TYPE.STR;
  else if (typeof value === "number") return FIELD_TYPE.NUM;
  else if (typeof value === "boolean") return FIELD_TYPE.BOOL;
  return FIELD_TYPE.STR;
}
