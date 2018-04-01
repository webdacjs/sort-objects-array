const descwords = ['desc', 'reverse']

const injMissVals = (originalArray, sortedArray, key) => {
  const miss = originalArray.filter(x => !x[key])
  if (miss.length > 0) {
    console.log(`Warn: ${miss.length} missing the '${key}' property`)
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

const checkErrors = (arrayToSort, key) => {
  if (!Array.isArray(arrayToSort)) {
    throw new Error('An array was noy provided to perform the sort')
  }
  if (typeof key !== 'string') {
    throw new Error('A property was not provided to use a as sort key')
  }
  if (arrayToSort.filter(x => x[key]).length === 0) {
    console.log(`Property ${key} was not found in any object of the array.`)
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
  const order = getSortOrder(orderOrConfig)
  const caseSensitivity = getCaseSensitivity(orderOrConfig)
  checkErrors(arrayToSort, key)
  const sortedArray = arrayToSort.filter(x => Boolean(x[key])).sort(
    getSortFunction(order, key, caseSensitivity)
  )
  injMissVals(arrayToSort, sortedArray, key)
  return sortedArray
}

module.exports = sortObjectsArray
