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
  orderOrConfig?: string | configParams | undefined;
}

interface KeyValue {
  [key: string]: any;
}

/**
 * Converts an object to an array of key-value pairs.
 * @param val - The object to convert.
 * @returns The array of key-value pairs.
 */
export const convertObjectToArray = (val: Record<string, any>): KeyValue[] =>
  Object.keys(val).map((x) => ({ key: x, value: val[x] }));

/**
 * Gets the missing values in an array of key-value pairs.
 * @param originalArray - The original array.
 * @param key - The key to check for missing values.
 * @returns The array of missing values.
 */
const getMissingValues = (originalArray: KeyValue[], key: string): KeyValue[] =>
  originalArray.filter((x) => !x[key]);

/**
 * Injects missing values into a sorted array.
 * @param originalArray - The original array.
 * @param sortedArray - The sorted array.
 * @param key - The key to check for missing values.
 * @returns The array with injected missing values.
 */
export const injectMissValues = (
  originalArray: KeyValue[],
  sortedArray: KeyValue[],
  key: string
): KeyValue[] => {
  const miss = getMissingValues(originalArray, key);
  return miss.length > 0 ? [...sortedArray, ...miss] : sortedArray;
};

/**
 * Converts a value to lowercase string.
 * @param val - The value to convert.
 * @returns The lowercase string value.
 */
const getLowerCaseValue = (val: any): string => String(val).toLowerCase();

/**
 * Gets the sort array based on the order.
 * @param order - The sort order.
 * @returns The sort array.
 */
function getSortArray(order: string): number[] {
  return order === 'desc' ? [1, -1, 0] : [-1, 1, 0];
}

/**
 * Gets the sort function for case-insensitive sorting.
 * @param i - The sort array.
 * @param key - The key to sort by.
 * @returns The sort function.
 */
function getSortFunctionInsensitive(
  i: number[],
  key: string
): (a: KeyValue, b: KeyValue) => number {
  return function (a, b) {
    const aVal = getLowerCaseValue(a[key]);
    const bVal = getLowerCaseValue(b[key]);
    if (aVal < bVal) {
      return i[0];
    } else if (bVal < aVal) {
      return i[1];
    } else {
      return i[2];
    }
  };
}

/**
 * Gets the standard sort function.
 * @param i - The sort array.
 * @param key - The key to sort by.
 * @returns The sort function.
 */
const getSortFunctionStandard =
  (i: number[], key: string): ((a: KeyValue, b: KeyValue) => number) =>
  (a, b) =>
    a[key] < b[key] ? i[0] : b[key] < a[key] ? i[1] : i[2];

/**
 * Gets the sort function based on the order and case sensitivity.
 * @param order - The sort order.
 * @param key - The key to sort by.
 * @param casesensitive - Whether the sorting is case-sensitive.
 * @returns The sort function.
 */
const getSortFunction = (
  order: string,
  key: string,
  casesensitive: boolean
): ((a: KeyValue, b: KeyValue) => number) =>
  casesensitive
    ? getSortFunctionInsensitive(getSortArray(order), key)
    : getSortFunctionStandard(getSortArray(order), key);

/**
 * Gets the sort order from the parameters.
 * @param params - The order or configuration parameters.
 * @returns The sort order.
 */
function getSortOrder(params: string | { order?: string }): string | undefined {
  if (isString(params) && descwords.indexOf(String(params)) > -1) {
    return 'desc';
  } else if (
    isObject(params) &&
    params !== null &&
    descwords.indexOf(String((params as { order?: string }).order)) > -1
  ) {
    return 'desc';
  }
  return undefined;
}

/**
 * Gets the case sensitivity from the parameters.
 * @param params - The configuration parameters.
 * @returns The case sensitivity.
 */
const getCaseSensitivity = (params: { caseinsensitive?: boolean } | null | undefined): boolean =>
  params && typeof params === 'object' ? (params.caseinsensitive ?? false) : false;

/**
 * Sorts an array of key-value pairs based on the key and order or configuration parameters.
 * Uses Schwartzian transform for performance.
 * @param arrayToSort - The array to sort.
 * @param key - The key to sort by.
 * @param orderOrConfig - The sort order or configuration parameters.
 * @returns The sorted array.
 */
export function getSortedArray(
  arrayToSort: KeyValue[],
  key: string,
  orderOrConfig: string | { order?: string; caseinsensitive?: boolean }
): KeyValue[] {
  const keySensitivity =
    typeof orderOrConfig === 'object' && orderOrConfig !== null
      ? getCaseSensitivity(orderOrConfig)
      : false;
  const order = getSortOrder(orderOrConfig) || '';

  // Filter items that have the key (not null/undefined)
  const filtered = arrayToSort.filter((x) => x[key] !== undefined && x[key] !== null);

  // Precompute sort keys
  const sortKey = (item: KeyValue) => {
    const value = item[key];
    if (keySensitivity && typeof value === 'string') {
      return value.toLowerCase();
    }
    return value;
  };

  // Decorate
  const decorated = filtered.map((item) => ({
    item,
    sortValue: sortKey(item),
  }));

  // Sort
  const direction = order === 'desc' || order === 'reverse' ? -1 : 1;
  decorated.sort((a, b) => {
    if (a.sortValue == null) return 1;
    if (b.sortValue == null) return -1;
    if (a.sortValue < b.sortValue) return -1 * direction;
    if (a.sortValue > b.sortValue) return 1 * direction;
    return 0;
  });

  // Undecorate
  return decorated.map((d) => d.item);
}
