const descwords = ['desc', 'reverse']
const filter = require('lodash.filter')
const { isString, isObject } = require('./typeCheck')

const objToArray = val => Object.keys(val).map(x => ({ key: x, value: val[x] }))

const getMissingVals = (originalArray, key) => filter(originalArray, x => !x[key])

const injMissVals = (originalArray, sortedArray, key) => {
  const miss = getMissingVals(originalArray, key)
  return miss.length > 0
    ? sortedArray.concat(miss)
    : sortedArray
}

const getLowCasVal = (val) => String(val).toLowerCase()

const getSortArray = order => order === 'desc' ? [1, -1, 0] : [-1, 1, 0]

const getSortFunctionInsensitive = (i, key) => (a, b) => (
  getLowCasVal(a[key]) < getLowCasVal(b[key])) ? i[0] : (
    (getLowCasVal(b[key]) < getLowCasVal(a[key])) ? i[1] : i[2])

const getSortFunctionStandard = (i, key) => (a, b) => (a[key] < b[key])
  ? i[0] : ((b[key] < a[key]) ? i[1] : i[2])

const getSortFunction = (order, key, casesensitive) => casesensitive === true
  ? getSortFunctionInsensitive(getSortArray(order), key)
  : getSortFunctionStandard(getSortArray(order), key)

const getSortOrder = params => isString(params) && descwords.indexOf(params) > -1
  ? 'desc'
  : isObject(params) && descwords.indexOf(params.order) > -1
    ? 'desc'
    : undefined

const getCaseSensitivity = params => isObject(params) && params.caseinsensitive

function getSortedArray (arrayToSort, key, orderOrConfig) {
  const sortFunction = getSortFunction(
    getSortOrder(orderOrConfig), key, getCaseSensitivity(orderOrConfig))
  return filter(arrayToSort, x => Boolean(x[key])).sort(sortFunction)
}

module.exports = {
  objToArray,
  injMissVals,
  getSortFunction,
  getSortOrder,
  getCaseSensitivity,
  getSortedArray
}
