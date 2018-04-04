const descwords = ['desc', 'reverse']

// Lodash filter function released under MIT license.
// https://raw.githubusercontent.com/lodash/lodash/4.17.4/LICENSE
const filter = (array, predicate) => {
  let index = -1
  let resIndex = 0
  const length = array == null ? 0 : array.length
  const result = []

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result[resIndex++] = value
    }
  }
  return result
}

const injMissVals = (originalArray, sortedArray, key) => {
  const miss = filter(originalArray, x => !x[key])
  if (miss.length > 0) {
    miss.forEach((x) => {
      sortedArray.push(x)
    })
  }
}

const getLowerCaseValue = (val) => {
  return String(val).toLowerCase()
}

const getSortFunction = (order, key, casesensitive) => {
  let i = [-1, 1, 0]
  if (order === 'desc') i = [1, -1, 0]
  if (casesensitive === true) {
    return (a, b) => (
    getLowerCaseValue(a[key]) < getLowerCaseValue(b[key])) ? i[0] : (
      (getLowerCaseValue(b[key]) < getLowerCaseValue(a[key])) ? i[1] : i[2])
  }
  return (a, b) => (a[key] < b[key]) ? i[0] : ((b[key] < a[key]) ? i[1] : i[2])
}

const getSortOrder = (params) => {
  if (typeof (params) === 'string' && descwords.includes(params)) {
    return 'desc'
  } else if (typeof (params) === 'object' && descwords.includes(params.order)) {
    return 'desc'
  }
}

const getCaseSensitivity = (params) => {
  if (typeof (params) === 'object' && params.caseinsensitive === true) {
    return true
  }
}

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
