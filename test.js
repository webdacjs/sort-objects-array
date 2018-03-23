const test = require('tape')
const colorize = require('tap-colorize')

// Modules loaded for testing.
const sortObjectsArray = require('./index.js')

// Objects Array to test.
const countries = [
  {'name': 'Colombia', 'code': 'co', 'area': 1197411},
  {'name': 'Argentina', 'code': 'ar', 'area': 2766890},
  {'name': 'NonExistingCountry'},
  {'name': 'Brasil', 'code': 'br', 'area': 8511965}
]

console.log('Original Array to Test:')
console.log(countries)

test.createStream().pipe(colorize()).pipe(process.stdout)

test('Testing normal sorting of the array by name property', t => {
  t.plan(4)
  const sortedArray = sortObjectsArray(countries, 'name')
  t.equal(sortedArray[0].name, 'Argentina', 'Argentina first result')
  t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
  t.equal(sortedArray[2].name, 'Colombia', 'Colombia last result')
  t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
  t.end()
})

test('Testing desc sorting by the area property', t => {
  t.plan(5)
  const sortedArray = sortObjectsArray(countries, 'area', 'desc')
  t.equal(sortedArray[0].name, 'Brasil', 'Brasil first result')
  t.equal(sortedArray[1].name, 'Argentina', 'Argentina second result')
  t.equal(sortedArray[2].name, 'Colombia', 'Colombia last result')
  t.equal(sortedArray[3].name, 'NonExistingCountry', 'NonExistingCountry last result because of missing property')
  t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
  t.end()
})
