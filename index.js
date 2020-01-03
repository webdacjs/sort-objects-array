const ch = require('console-hue')
const { isAnObject } = require('./utils/typeCheck')
const validateArgs = require('./utils/validateArgs')
const injectMissingValues = require('./utils/injectMissing')
const { objToArray, getSortedArray } = require('./utils/getsortutils.js')

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
function sortObjectsArray (valueToSort, key, orderOrConfig) {
  const arrayToSort = isAnObject(valueToSort) ? objToArray(valueToSort) : valueToSort
  if (validateArgs(arrayToSort, key)) {
    ch.warn('* sort-objects-array: Wrong arguments returning original array / object')
    return valueToSort
  }
  return injectMissingValues(
    arrayToSort,
    getSortedArray(arrayToSort, key, orderOrConfig),
    key
  )
}

module.exports = sortObjectsArray
