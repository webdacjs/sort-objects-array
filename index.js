const filter = require('./filter.js')
const {injMissVals, getSortFunction,
  getSortOrder, getCaseSensitivity} = require('./getsortutils.js')

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
const sortObjectsArray = (arrayToSort, key, orderOrConfig) => {
  if (!Array.isArray(arrayToSort) || typeof key !== 'string') {
    console.log('* sort-objects-array: Wrong arguments returning original array')
    return arrayToSort
  } else {
    const order = getSortOrder(orderOrConfig)
    const caseSensitivity = getCaseSensitivity(orderOrConfig)
    const sortedArray = filter(arrayToSort, x => Boolean(x[key])).sort(
      getSortFunction(order, key, caseSensitivity)
    )
    injMissVals(arrayToSort, sortedArray, key)
    return sortedArray
  }
}

module.exports = sortObjectsArray
