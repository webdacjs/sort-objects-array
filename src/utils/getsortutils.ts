const descwords: string[] = ['desc', 'reverse'];
import { isString, isObject } from './typeCheck';

export interface configParams {
  order?: string;
  caseinsensitive?: boolean;
  flatten?: boolean;
}

export interface SortObjectsArrayParams {
  valueToSort: any;
  key: string;
  orderOrConfig?: string | configParams;
}

interface KeyValue {
  [key: string]: any;
}
const objToArray = (val: Record<string, any>): KeyValue[] =>
  Object.keys(val).map((x) => ({ key: x, value: val[x] }));

const getMissingVals = (originalArray: KeyValue[], key: string): KeyValue[] =>
  originalArray.filter((x) => !x[key]);

const injMissVals = (
  originalArray: KeyValue[],
  sortedArray: KeyValue[],
  key: string
): KeyValue[] => {
  const miss = getMissingVals(originalArray, key);
  return miss.length > 0 ? [...sortedArray, ...miss] : sortedArray;
};

const getLowCasVal = (val: any): string => String(val).toLowerCase();

function getSortArray(order: string): number[] {
  return order === 'desc' ? [1, -1, 0] : [-1, 1, 0];
}

function getSortFunctionInsensitive(i: number[], key: string): (a: KeyValue, b: KeyValue) => number {
  return function(a, b) {
    const aVal = getLowCasVal(a[key]);
    const bVal = getLowCasVal(b[key]);
    if (aVal < bVal) {
      return i[0];
    } else if (bVal < aVal) {
      return i[1];
    } else {
      return i[2];
    }
  };
}

const getSortFunctionStandard = (
  i: number[],
  key: string
): ((a: KeyValue, b: KeyValue) => number) => (a, b) =>
    a[key] < b[key] ? i[0] : b[key] < a[key] ? i[1] : i[2];

const getSortFunction = (
  order: string,
  key: string,
  casesensitive: boolean
): ((a: KeyValue, b: KeyValue) => number) =>
  casesensitive
    ? getSortFunctionInsensitive(getSortArray(order), key)
    : getSortFunctionStandard(getSortArray(order), key);

function getSortOrder(params: string | { order?: string }): string | undefined {
  if (isString(params) && descwords.indexOf(String(params)) > -1) {
    return 'desc';
  }
  // @ts-ignore
  else if (isObject(params) && descwords.indexOf(String(params.order)) > -1) {
    return 'desc';
  }
  return undefined;
}

const getCaseSensitivity = (params: { caseinsensitive?: boolean }): boolean =>
  isObject(params) && params.caseinsensitive ? true : false;

function getSortedArray(
  arrayToSort: KeyValue[],
  key: string,
  orderOrConfig: string | { order?: string; caseinsensitive?: boolean }
): KeyValue[] {

  // @ts-ignore
  const keySensitivity = getCaseSensitivity(orderOrConfig)

  const sortFunction = getSortFunction(
    getSortOrder(orderOrConfig) || '',
    key,
    keySensitivity
  );
  return arrayToSort.filter(x => x[key]).sort(sortFunction);
}

export {
  objToArray,
  injMissVals,
  getSortFunction,
  getSortOrder,
  getCaseSensitivity,
  getSortedArray,
};