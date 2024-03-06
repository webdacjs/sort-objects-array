import { isAnObject } from './utils/typeCheck';
import validateArgs from './utils/validateArgs';
import injectMissingValues from './utils/injectMissing';
import { objToArray, getSortedArray, configParams } from './utils/getsortutils';
import getArrayToSort from './utils/getArrayToSort';

/**
 * Sort an objects array based on the property required in the parameters.
 *
 * @param {Array} valueToSort - source array or object to sort
 * @param {string} key - name of property to use in the sort.
 * @param {string or object} order or config - optional 'desc' or 'reverse' string
 *      to indicate sort descending or configuration object with order and / or
 *      caseinsensitive flag.
 * @returns {Array}
 */
function sortObjectsArray(valueToSort: any, key: string, orderOrConfig: configParams) {
  
  // Use type assertion to specify the expected type
  const orderConfig = orderOrConfig as configParams;
  
  const arrayToSort = getArrayToSort(valueToSort, orderConfig);
  
  if (validateArgs(arrayToSort, key)) {
    console.log('* sort-objects-array: Wrong arguments returning original array / object');
    return valueToSort;
  }
  
  // @ts-ignore
  const sortedArray = getSortedArray(arrayToSort, key, orderConfig)

  return injectMissingValues(
    arrayToSort,
    sortedArray,
    key
  );
}

export default sortObjectsArray;
