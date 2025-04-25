

import validateArgs from './utils/validateArgs';
import injectMissingValues from './utils/injectMissing';
import { getSortedArray, configParams } from './utils/getsortutils';
import getArrayToSort from './utils/getArrayToSort';
import { isArrayofArrays, isAnObject } from './utils/typeCheck';

/**
 * Sorts an array of objects based on a specified key and order or configuration.
 * 
 * @param valueToSort - The value to sort, which can be an array of objects or an array of arrays.
 * @param key - The key to sort the objects by.
 * @param orderOrConfig - The order or configuration to use for sorting.
 * 
 * @returns The sorted array of objects.
 */
function sortObjectsArray(valueToSort: any, key: string, orderOrConfig?: configParams) {
  
  const orderConfig = orderOrConfig || {order: "asc"} as configParams;  
  const arrayToSort = getArrayToSort(valueToSort, orderConfig);
  
  if (validateArgs(arrayToSort, key)) {
    console.log('* sort-objects-array: Wrong arguments returning original array / object');
    return valueToSort;
  }
  
  const sortedArray = getSortedArray(arrayToSort, key, orderConfig)

  return injectMissingValues(
    arrayToSort,
    sortedArray,
    key
  );
}

/**
 * Sorts an array of objects based on a specified key and order or configuration.
 * If the value to sort is an array of arrays and the order or configuration is an object with `flatten` set to `false`,
 * it will recursively sort each inner array.
 * 
 * @param valueToSort - The value to sort, which can be an array of objects or an array of arrays.
 * @param key - The key to sort the objects by.
 * @param orderOrConfig - The order or configuration to use for sorting.
 * 
 * @returns The sorted array of objects.
 */
export function sortObjArr(valueToSort: Array<Record<string, any>> | Array<any[]> | Record<string, any>, key: string, orderOrConfig?: configParams | string): Array<Record<string, any>> {
  const normalizedConfig: configParams = typeof orderOrConfig === 'string' 
    ? { order: orderOrConfig } 
    : orderOrConfig || { order: 'asc' };

  if (isArrayofArrays(valueToSort) && (!normalizedConfig || (isAnObject(normalizedConfig) && !normalizedConfig.flatten))) {
    return valueToSort.map((x: any) => sortObjectsArray(x, key, normalizedConfig));
  } else {
    return sortObjectsArray(valueToSort, key, normalizedConfig);
  }
}
