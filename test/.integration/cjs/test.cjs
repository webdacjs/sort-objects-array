// CommonJS integration test for sort-objects-array build output

const assert = require('assert');
const { sortObjArr } = require('../../../dist/index.js');

const countries = [
  { name: 'Colombia', code: 'co', area: 1197411 },
  { name: 'Argentina', code: 'ar', area: 2766890 },
  { name: 'canada', code: 'ca', area: 9984670 },
  { name: 'NonExistingCountry' },
  { name: 'Brasil', code: 'br', area: 8511965 },
];

try {
  // Check export type
  assert.strictEqual(typeof sortObjArr, 'function', 'sortObjArr should be a function');

  // Check sorting result by 'name'
  assert.strictEqual(typeof sortObjArr, 'function', 'sortObjArr should be a function');
  const sorted = sortObjArr(countries, 'name');
  assert.strictEqual(sorted[0].name, 'Argentina', 'sortObjArr should return expected sorting');
  assert.strictEqual(sorted.length, countries.length, 'Sorted array should have same length');

  console.log('✅ CommonJS integration test PASSED');
} catch (error) {
  console.error('❌ CommonJS integration test FAILED:', error);
  process.exit(1);
}
