export function isAnObject (val: any) {
  return !(val === null || val.constructor.name.toLowerCase() !== 'object')
}

export function isString (val: any) {
  return typeof (val) === 'string'
}

export function isObject (val: any) {
  return typeof (val) === 'object'
}

export function isArrayofArrays (input: any): boolean {
  return Array.isArray(input) && input.every((element: any) => Array.isArray(element)); 
}
