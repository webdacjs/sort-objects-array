export function isAnObject (val: any) {
  return !(val === null || val.constructor.name.toLowerCase() !== 'object')
}

export function isString (val: any) {
  return typeof (val) === 'string'
}

export function isObject (val: any) {
  return typeof (val) === 'object'
}