const descwords = ['desc', 'reverse']
const filter = require('./filter.js')

const injMissVals = (originalArray, sortedArray, key) => {
  const miss = filter(originalArray, x => !x[key])
  if (miss.length > 0) {
    miss.forEach((x) => {
      sortedArray.push(x)
    })
  }
}

const getLowCasVal = (val) => {
  return String(val).toLowerCase()
}

const getSortFunction = (order, key, casesensitive) => {
  let i = [-1, 1, 0]
  if (order === 'desc') i = [1, -1, 0]
  if (casesensitive === true) {
    return (a, b) => (
    getLowCasVal(a[key]) < getLowCasVal(b[key])) ? i[0] : (
      (getLowCasVal(b[key]) < getLowCasVal(a[key])) ? i[1] : i[2])
  }
  return (a, b) => (a[key] < b[key]) ? i[0] : ((b[key] < a[key]) ? i[1] : i[2])
}

const getSortOrder = (params) => {
  if (typeof (params) === 'string' && descwords.indexOf(params) > -1) {
    return 'desc'
  } else if (typeof (params) === 'object' && descwords.indexOf(params.order) > -1) {
    return 'desc'
  }
}

const getCaseSensitivity = (params) => {
  if (typeof (params) === 'object' && params.caseinsensitive === true) {
    return true
  }
}

module.exports = {
  injMissVals,
  getSortFunction,
  getSortOrder,
  getCaseSensitivity
}
