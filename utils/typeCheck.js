function isAnObject (val) {
  return !(val === null || val.constructor.name.toLowerCase() !== 'object')
}

function isString (val) {
  return typeof (val) === 'string'
}

function isObject (val) {
  return typeof (val) === 'object'
}

module.exports = {
  isAnObject,
  isString,
  isObject
}
