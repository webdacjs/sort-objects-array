const filter = require('./filter.js')
const {injMissVals, getSortFunction, getSortOrder,
    getCaseSensitivity, isAnObject, objToArray} = require('./getsortutils.js')

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
  if (!Array.isArray(arrayToSort) || typeof key !== 'string') {
    console.log('* sort-objects-array: Wrong arguments returning original array')
    return arrayToSort
  }
  const order = getSortOrder(orderOrConfig)
  const caseSensitivity = getCaseSensitivity(orderOrConfig)
  const sortedArray = filter(arrayToSort, x => Boolean(x[key])).sort(
      getSortFunction(order, key, caseSensitivity)
    )
  return injMissVals(arrayToSort, sortedArray, key)
}

module.exports = sortObjectsArray
