// ESM integration test
// This test verifies that the built package can be properly imported in an ESM environment

import assert from 'assert';
import { sortObjArr as soa } from '../../../dist/index.js';

const countries = [
  { name: 'Colombia', code: 'co', area: 1197411 },
  { name: 'Argentina', code: 'ar', area: 2766890 },
  { name: 'canada', code: 'ca', area: 9984670 },
  { name: 'NonExistingCountry' },
  { name: 'Brasil', code: 'br', area: 8511965 }
]

try {
  // Test the ESM exports
  console.log('Testing ESM imports...');
  assert.strictEqual(typeof soa, 'function', 'sortObjArr should be a function');
  assert.strictEqual(soa(countries, "name")[0].name, 'Argentina', 'sortObjArr should return expected sorting');
  console.log('✅ ESM integration test PASSED');
} catch (error) {
  console.error('❌ ESM integration test FAILED:', error);
  process.exit(1);
}