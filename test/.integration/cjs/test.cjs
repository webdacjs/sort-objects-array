// CommonJS integration test
// This test verifies that the built package can be properly required in a CJS environment

const assert = require('assert');
const { sortObjArr } = require('../../../dist/index.js');

const countries = [
  { name: 'Colombia', code: 'co', area: 1197411 },
  { name: 'Argentina', code: 'ar', area: 2766890 },
  { name: 'canada', code: 'ca', area: 9984670 },
  { name: 'NonExistingCountry' },
  { name: 'Brasil', code: 'br', area: 8511965 }
]

try {
  // Test the CJS exports
  console.log('Testing CommonJS imports...');
  assert.strictEqual(typeof sortObjArr, 'function', 'sortObjArr should be a function');
  assert.strictEqual(sortObjArr(countries, "name")[0].name, 'Argentina', 'sortObjArr should return expected sorting');
  console.log('✅ CommonJS integration test PASSED');
} catch (error) {
  console.error('❌ CommonJS integration test FAILED:', error);
  process.exit(1);
}
