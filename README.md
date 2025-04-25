# sort-objects-array

This tiny and fast module performs the sort of an Array of objects with the property required. The module returns a new copy of the array so the original is not mutated. The module even supports the sort objects (but they get transformed into an array of objects first)

This module only has dev dependencies (`vitest`, `tsup`, `typescript`) to run the tests and develop in ts.

## Install

You can install it with npm:

```sh
$ npm install --save sort-objects-array
```
## Usage

The module requires two parameters: The array to sort and the property to use in the sorting:

```ts
// Example1: Sorting the countries by the name

import { sortObjArr } from 'sort-objects-array';

interface Country {
    name: string;
    code: string;
    area: number;
}

const countries: Country[] = [
    { name: 'Colombia', code: 'co', area: 1197411 },
    { name: 'Argentina', code: 'ar', area: 2766890 },
    { name: 'Brasil', code: 'br', area: 8511965 },
    { name: 'canada', code: 'ca', area: 9984670 }
];

sortObjArr(countries, 'name');
// Returns
// [ { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Colombia', code: 'co', area: 1197411 },
//   { name: 'canada', code: 'ca', area: 9984670 } ]
```

The default order is **ascending** but it's possible to change the order to descending using *'desc'* or *'reverse'* keyword as a third parameter:

```ts

// Example2: Sorting the countries by the largest area

sortObjArr(countries, 'area', 'desc');
// Returns
// [ { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

If you prefer you can pass the order as a configuration object using the **order**
property:

```ts
// Example3: Sorting the countries by the largest area using config object.
sortObjArr(countries, 'area', {order: 'desc'});
// Returns
// [ { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Colombia', code: 'co', area: 1197411 } ]
```

By default, the module respects the case sensitivity of the values. If you want to override it and ignore it you can pass the flag ***caseinsensitive*** in the configuration object.

```ts

// Example4: Sorting by name. Case insensitive

sortObjArr(countries, 'name', {caseinsensitive: true});
// Returns
// [ { name: 'Argentina', code: 'ar', area: 2766890 },
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Colombia', code: 'co', area: 1197411 } ]

```
Or both:

```ts

// Example5: Sorting by name desc and case insensitive

sortObjArr(countries, 'name', {order: 'desc', caseinsensitive: true});
// Returns
// [ { name: 'Colombia', code: 'co', area: 1197411 },
//   { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'Brasil', code: 'br', area: 8511965 },
//   { name: 'Argentina', code: 'ar', area: 2766890 } ]

```

It can also sort objects, converting them first to an array of objects using 'key' and 'value' in each item:

```ts

// Example6: Sorting by an object by value

const countriesObj = {
    Colombia: 1197411,
    Argentina: 2766890,
    canada: 9984670,
    NonExistingCountry: null,
    Brasil: 8511965
}

sortObjArr(countriesObj, 'value', {order: 'desc'});
// Returns
// [ { key: 'canada', value: 9984670 },
//   { key: 'Brasil', value: 8511965 },
//   { key: 'Argentina', value: 2766890 },
//   { key: 'Colombia', value: 1197411 },
//   { key: 'NonExistingCountry', value: null } ]

```

Finally it can also sort an array of arrays, flattening or not based on your needs:

```ts

// Example7: Sorting the countries im an array of arrays

const countries = [{'name': 'Colombia', 'code': 'co', 'area': 1197411},
                   {'name': 'Argentina', 'code': 'ar', 'area': 2766890},
                   {'name': 'Brasil', 'code': 'br', 'area': 8511965},
                   {'name': 'canada', 'code': 'ca', 'area': 9984670}]

const countriesCountries = [countries, countries]

sortObjArr(countriesCountries, 'name');
// Returns
// [ [{ name: 'Argentina', code: 'ar', area: 2766890 }, ...],
//   [{ name: 'Argentina', code: 'ar', area: 2766890 }, ...]
// ]

// Example8: Sorting the countries im an array of arrays flattening them

sortObjArr(countriesCountries, 'area', { flatten: true, order: 'desc' });
// Returns
// [ { name: 'canada', 'code': 'ca', 'area': 9984670},
//   { name: 'canada', 'code': 'ca', 'area': 9984670},
//   ...
// ]

```

## Development

### Building
```bash
npm run build
```

### Testing
```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run integration tests (verifies both CJS and ESM compatibility)
npm run test:integration
```

## Why This Package Has Dual Module Support

This package is configured to work seamlessly with both CommonJS and ES Modules:

- **CommonJS**: The traditional Node.js module format using `require()`
- **ES Modules**: The standard JavaScript module format using `import/export`

This dual compatibility ensures the package can be used in any project, regardless of which module system it uses.

### License

Copyright © 2025, [Juan Convers](https://www.juanconvers.com).
Released under the [MIT License](LICENSE).