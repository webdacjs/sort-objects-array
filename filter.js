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

module.exports = filter
