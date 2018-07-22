const test = require('tape')
const colorize = require('tap-colorize')

// Modules loaded for testing.
const sortObjectsArray = require('./index.js')

// Objects Array to test.
const countries = [
      {'name': 'Colombia', 'code': 'co', 'area': 1197411},
      {'name': 'Argentina', 'code': 'ar', 'area': 2766890},
      {'name': 'canada', 'code': 'ca', 'area': 9984670},
      {'name': 'NonExistingCountry'},
      {'name': 'Brasil', 'code': 'br', 'area': 8511965}
]

const countriesObj = {
    Colombia: 1197411,
    Argentina: 2766890,
    canada: 9984670,
    NonExistingCountry: null,
    Brasil: 8511965
}

console.log('Original Array to Test:')
console.log(countries)

test.createStream().pipe(colorize()).pipe(process.stdout)

test('Testing normal sorting of the array by name property', t => {
      t.plan(6)
      const sortedArray = sortObjectsArray(countries, 'name')
      t.equal(sortedArray[0].name, 'Argentina', 'Argentina first result')
      t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
      t.equal(sortedArray[2].name, 'Colombia', 'Colombia third result')
      t.equal(sortedArray[4].name, 'canada', 'canada lowercase last result')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing desc sorting by the area property', t => {
      t.plan(7)
      const sortedArray = sortObjectsArray(countries, 'area', 'desc')
      t.equal(sortedArray[0].name, 'canada', 'canada first result')
      t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
      t.equal(sortedArray[2].name, 'Argentina', 'Argentina third result')
      t.equal(sortedArray[3].name, 'Colombia', 'Colombia fourth result')
      t.equal(sortedArray[4].name, 'NonExistingCountry', 'NonExistingCountry last result because of missing property')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing desc sorting by the area property passing a configuration object with order', t => {
      t.plan(7)
      const sortedArray = sortObjectsArray(countries, 'area', {order: 'desc'})
      t.equal(sortedArray[0].name, 'canada', 'canada first result')
      t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
      t.equal(sortedArray[2].name, 'Argentina', 'Argentina third result')
      t.equal(sortedArray[3].name, 'Colombia', 'Colombia fourth result')
      t.equal(sortedArray[4].name, 'NonExistingCountry', 'NonExistingCountry last result because of missing property')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing desc sorting by the area property passing a configuration object with order and case insensivity', t => {
      t.plan(7)
      const sortedArray = sortObjectsArray(countries, 'area', {order: 'desc', caseinsensitive: true})
      t.equal(sortedArray[0].name, 'canada', 'canada first result')
      t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
      t.equal(sortedArray[2].name, 'Argentina', 'Argentina third result')
      t.equal(sortedArray[3].name, 'Colombia', 'Colombia fourth result')
      t.equal(sortedArray[4].name, 'NonExistingCountry', 'NonExistingCountry last result because of missing property')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing normal sorting of the array by name property passing a caseinsensitive flag', t => {
      t.plan(6)
      const sortedArray = sortObjectsArray(countries, 'name', {caseinsensitive: true})
      t.equal(sortedArray[0].name, 'Argentina', 'Argentina first result')
      t.equal(sortedArray[1].name, 'Brasil', 'Brasil second result')
      t.equal(sortedArray[2].name, 'canada', 'canada third result before Colombia.')
      t.equal(sortedArray[3].name, 'Colombia', 'Colombia fourth result.')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing sorting by non-existing property', t => {
      t.plan(4)
      const sortedArray = sortObjectsArray(countries, 'nonexistingproperty')
      t.equal(sortedArray[0].name, 'Colombia', 'Colombia first result. The order was not changed.')
      t.equal(sortedArray[4].name, 'Brasil', 'Brasil third result. The order was not changed.')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})


test('Testing sorting by with missing property to sort', t => {
      t.plan(4)
      const sortedArray = sortObjectsArray(countries)
      t.equal(sortedArray[0].name, 'Colombia', 'Colombia first result. The order was not changed.')
      t.equal(sortedArray[4].name, 'Brasil', 'Brasil third result. The order was not changed.')
      t.equal(countries[0].name, 'Colombia', 'Test original array was not mutated')
      t.equal(countries.length, sortedArray.length, 'Test original and sorted array have the same length')
      t.end()
})

test('Testing sorting an object by value', t => {
      t.plan(3)
      const sortedArray = sortObjectsArray(countriesObj, 'value', 'desc')
      t.equal(sortedArray[0].key, 'canada', 'Canada first result.')
      t.equal(countriesObj.canada, 9984670, 'Test original object was not mutated')
      t.equal(Object.keys(countriesObj).length, sortedArray.length, 'Test original object and sorted array have the same length')
      t.end()
})
