# sort-objects-array

This tiny and fast module performs the sort of an Array of objects with the property required. The module returns a new copy of the array so the original is not mutated. The module doesn't have any external dependencies (only tape to run the tests).

## Install

You can install with [npm]:

```sh
$ npm install --save sort-objects-array
```
## Usage

The module requires two parameters: The array to sort and the property to use in the sorting:

```js

// Example1: Sorting the countries by the name

const sortObjectsArray = require('sort-objects-array');
const countries = [{'name': 'Colombia', 'code': 'co', 'area': 1197411},
                   {'name': 'Argentina', 'code': 'ar', 'area': 2766890},
                   {'name': 'Brasil', 'code': 'br', 'area': 8511965}]

sortObjectsArray(countries, 'name');
// Returns
// [ { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

The default order is **ascending** but it's possible to change the order to descending using *'desc'* or *'reverse'* keyword as a third parameter:

```js

// Example2: Sorting the countries by the largest area

sortObjectsArray(countries, 'area', 'desc');
// Returns
// [ { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

### Running tests

You can run the tests and check the functionality of this module using:

```sh
$ npm install && npm test
```

### License

Copyright © 2018, [Juan Convers](https://github.com/webdacjs).
Released under the [MIT License](LICENSE).
