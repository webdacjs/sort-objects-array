# sort-objects-array

This tiny and fast module performs the sort of an Array of objects with the property required. The module returns a new copy of the array so the original is not mutated. The module even support the sort objects (but they get transformed to an array of objects first)

The only dependencies this module have is jest to run the tests and [console-hue](https://www.npmjs.com/package/console-hue)

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
                   {'name': 'Brasil', 'code': 'br', 'area': 8511965},
                   {'name': 'canada', 'code': 'ca', 'area': 9984670}]

sortObjectsArray(countries, 'name');
// Returns
// [ { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Colombia', code: 'co', area: 1197411 },
//   { name: 'canada', 'code': 'ca', 'area': 9984670} ]
```

The default order is **ascending** but it's possible to change the order to descending using *'desc'* or *'reverse'* keyword as a third parameter:

```js

// Example2: Sorting the countries by the largest area

sortObjectsArray(countries, 'area', 'desc');
// Returns
// [ { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

If you prefer you can pass the order as a configuration object using the **order**
property:

```js

// Example3: Sorting the countries by the largest area using config object.

sortObjectsArray(countries, 'area', {order: 'desc'});
// Returns
// [ { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

By default the module respects the case sensitivity of the values. If you want to override it and ignore it you can pass the flag ***caseinsensitive*** in the configuration object.

```js

// Example4: Sorting by name. Case insensitive

sortObjectsArray(countries, 'name', {caseinsensitive: true});
// Returns
// [ { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Colombia', code: 'co', area: 1197411 } ]

```
Or both:

```js

// Example5: Sorting by name desc and case insensitive

sortObjectsArray(countries, 'name', {order: 'desc', caseinsensitive: true});
// Returns
// [ { name: 'Colombia', code: 'co', area: 1197411 },
//   { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 } ]

```

Finally it can sort objects, converting them first to an array of objects using 'key' and 'value' in each item:

```js

// Example6: Sorting by an object by value

const countriesObj = {
    Colombia: 1197411,
    Argentina: 2766890,
    canada: 9984670,
    NonExistingCountry: null,
    Brasil: 8511965
}

sortObjectsArray(countriesObj, 'value', {order: 'desc'});
// Returns
// [ { key: 'canada', value: 9984670 },
//   { key: 'Brasil', value: 8511965 },
//   { key: 'Argentina', value: 2766890 },
//   { key: 'Colombia', value: 1197411 },
//   { key: 'NonExistingCountry', value: null } ]

```

### Running tests

You can run the tests and check the functionality of this module using:

```sh
$ npm install && npm test
```

### License

Copyright © 2018, [Juan Convers](https://juanconvers.com).
Released under the [MIT License](LICENSE).
