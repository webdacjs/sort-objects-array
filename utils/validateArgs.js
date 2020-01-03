const { isString } = require('./typeCheck')

module.exports = function (arr, key) {
  return !Array.isArray(arr) || !isString(key)
}
