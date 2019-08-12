const ch = require('console-hue')
const {
  injMissVals,
  isAnObject,
  objToArray,
  validateArgs,
  getSortedArray
} = require('./getsortutils.js')

/**
 * Sort an objects array based on the property required in the parameters.
 *
 * @param {Array} arrayToSort - source array
 * @param {string} key - name of property to use in the sort.
 * @param {string or object} order or config - optional 'desc' or 'reverse' string
 *      to indicate sort descending or configuration object with order and / or
 *      caseinsensitive flag.
 * @returns {Array}
*/
const sortObjectsArray = (valueToSort, key, orderOrConfig) => {
  const arrayToSort = isAnObject(valueToSort) ? objToArray(valueToSort) : valueToSort
  if (validateArgs(arrayToSort, key)) {
    ch.warn('* sort-objects-array: Wrong arguments returning original array / object')
    return valueToSort
  }
  return injMissVals(
    arrayToSort,
    getSortedArray(arrayToSort, key, orderOrConfig),
    key
  )
}

module.exports = sortObjectsArray
