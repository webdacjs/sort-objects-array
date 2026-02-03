import assert from 'assert';
import { sortObjArr } from '../../../dist/index.mjs';

const countries = [
  { name: 'Colombia', code: 'co', area: 1197411 },
  { name: 'Argentina', code: 'ar', area: 2766890 },
  { name: 'canada', code: 'ca', area: 9984670 },
  { name: 'NonExistingCountry' },
  { name: 'Brasil', code: 'br', area: 8511965 },
];

try {
  // Test the ESM exports
  console.log('Testing ESM imports...');
  assert.strictEqual(typeof sortObjArr, 'function', 'sortObjArr should be a function');
  const sorted = sortObjArr(countries, 'name');
  assert.strictEqual(sorted[0].name, 'Argentina', 'sortObjArr should return expected sorting');
  assert.strictEqual(sorted.length, countries.length, 'Sorted array should have same length');
  console.log('✅ ESM integration test PASSED');
} catch (error) {
  console.error('❌ ESM integration test FAILED:', error);
  process.exit(1);
}
