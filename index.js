const injMissVals = (originalArray, sortedArray, key) => {
  const miss = originalArray.filter(x => x[key] === undefined)
  if (miss.length > 0) {
    console.log(`Warn: ${miss.length} missing the '${key}' property`)
    miss.forEach((x) => {
      sortedArray.push(x)
    })
  }
}

const getSortFunction = (order, key) => {
  let i = [-1, 1, 0]
  if (order === 'desc' || order === 'reverse') i = [1, -1, 0]
  return (a, b) => (a[key] < b[key]) ? i[0] : ((b[key] < a[key]) ? i[1] : i[2])
}

const checkErrors = (arrayToSort, key) => {
  if (!Array.isArray(arrayToSort)) {
    throw new Error ('An array was noy provided to perform the sort')
  }
  if (typeof key !== 'string') {
    throw new Error ('A property was not provided to use a as sort key')
  }
  if(arrayToSort.filter(x => x[key]).length === 0) {
    console.log(`Property ${key} was not found in any object of the array.`)
  }
}

/**
 * Sort an objects array based on the property required in the parameters.
 *
 * @param {Array} arrayToSort - source array
 * @param {string} key - name of property to use in the sort.
 * @param {string} order - optional 'desc' or 'reverse' to indicate sort descending.
 * @returns {Array}
*/
const sortObjectsArray = (arrayToSort, key, order) => {
  checkErrors(arrayToSort, key)
  const sortedArray = arrayToSort.filter(x => x[key]).sort(
    getSortFunction(order, key)
  )
  injMissVals(arrayToSort, sortedArray, key)
  return sortedArray
}

module.exports = sortObjectsArray
