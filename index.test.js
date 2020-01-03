// Modules loaded for testing.
const sortObjectsArray = require('./index.js')

// Objects Array to test.
const countries = [
  { name: 'Colombia', code: 'co', area: 1197411 },
  { name: 'Argentina', code: 'ar', area: 2766890 },
  { name: 'canada', code: 'ca', area: 9984670 },
  { name: 'NonExistingCountry' },
  { name: 'Brasil', code: 'br', area: 8511965 }
]

const countriesObj = {
  Colombia: 1197411,
  Argentina: 2766890,
  canada: 9984670,
  NonExistingCountry: null,
  Brasil: 8511965
}

test('Testing normal sorting of the array by name property', () => {
  expect.assertions(6)
  const sortedArray = sortObjectsArray(countries, 'name')
  expect(sortedArray[0].name).toBe('Argentina')
  expect(sortedArray[1].name).toBe('Brasil')
  expect(sortedArray[2].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('canada')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing desc sorting by the area property', () => {
  expect.assertions(7)
  const sortedArray = sortObjectsArray(countries, 'area', 'desc')
  expect(sortedArray[0].name).toBe('canada')
  expect(sortedArray[1].name).toBe('Brasil')
  expect(sortedArray[2].name).toBe('Argentina')
  expect(sortedArray[3].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('NonExistingCountry')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})
//
test('Testing desc sorting by the area property passing a configuration object with order', () => {
  expect.assertions(7)
  const sortedArray = sortObjectsArray(countries, 'area', { order: 'desc' })
  expect(sortedArray[0].name).toBe('canada')
  expect(sortedArray[1].name).toBe('Brasil')
  expect(sortedArray[2].name).toBe('Argentina')
  expect(sortedArray[3].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('NonExistingCountry')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing desc sorting by the area property passing a configuration object with order and case insensivity', () => {
  expect.assertions(7)
  const sortedArray = sortObjectsArray(countries, 'area', { order: 'desc', caseinsensitive: true })
  expect(sortedArray[0].name).toBe('canada')
  expect(sortedArray[1].name).toBe('Brasil')
  expect(sortedArray[2].name).toBe('Argentina')
  expect(sortedArray[3].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('NonExistingCountry')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing normal sorting of the array by name property passing a caseinsensitive flag', () => {
  expect.assertions(6)
  const sortedArray = sortObjectsArray(countries, 'name', { caseinsensitive: true })
  expect(sortedArray[0].name).toBe('Argentina')
  expect(sortedArray[1].name).toBe('Brasil')
  expect(sortedArray[2].name).toBe('canada')
  expect(sortedArray[3].name).toBe('Colombia')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing sorting by non-existing property', () => {
  expect.assertions(4)
  const sortedArray = sortObjectsArray(countries, 'nonexistingproperty')
  expect(sortedArray[0].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('Brasil')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing sorting by with missing property to sort', () => {
  expect.assertions(4)
  const sortedArray = sortObjectsArray(countries)
  expect(sortedArray[0].name).toBe('Colombia')
  expect(sortedArray[4].name).toBe('Brasil')
  expect(countries[0].name).toBe('Colombia')
  expect(countries.length).toBe(sortedArray.length)
})

test('Testing sorting an object by value', () => {
  expect.assertions(3)
  const sortedArray = sortObjectsArray(countriesObj, 'value', 'desc')
  expect(sortedArray[0].key).toBe('canada')
  expect(countriesObj.canada).toBe(9984670)
  expect(Object.keys(countriesObj).length).toBe(sortedArray.length)
})
