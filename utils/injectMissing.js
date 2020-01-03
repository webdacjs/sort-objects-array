const filter = require('lodash.filter')

function getMissingVals (originalArray, key) {
  return filter(originalArray, x => !x[key])
}

module.exports = function (originalArray, sortedArray, key) {
  const missing = getMissingVals(originalArray, key)
  return missing.length > 0
    ? [...sortedArray, ...missing]
    : sortedArray
}
