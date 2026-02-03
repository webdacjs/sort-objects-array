/**
 * Benchmark suite for sort-objects-array
 * Compares performance with native Array.sort()
 */

import { sortObjArr } from '../src/main';

// Generate test data
function generateTestData(size: number) {
  const data = [];
  for (let i = 0; i < size; i++) {
    data.push({
      id: Math.floor(Math.random() * 10000),
      name: `Item${Math.floor(Math.random() * 1000)}`,
      value: Math.random() * 1000,
      timestamp: Date.now() + Math.random() * 100000,
    });
  }
  return data;
}

// Benchmark function
function benchmark(name: string, fn: () => void, iterations = 1000) {
  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const avgTime = (end - start) / iterations;
  console.log(`${name}: ${avgTime.toFixed(3)}ms (avg over ${iterations} iterations)`);
  return avgTime;
}

// Test data sets
const smallData = generateTestData(10);
const mediumData = generateTestData(100);
const largeData = generateTestData(1000);
const extraLargeData = generateTestData(10000);

console.log('=== Benchmark: sort-objects-array ===\n');

console.log('--- Small Dataset (10 items) ---');
const smallNative = benchmark(
  'Native sort (small)',
  () => {
    [...smallData].sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
  }
);
const smallLib = benchmark(
  'sortObjArr (small)',
  () => {
    sortObjArr(smallData, 'value');
  }
);
console.log(`Difference: ${((smallLib / smallNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- Medium Dataset (100 items) ---');
const mediumNative = benchmark(
  'Native sort (medium)',
  () => {
    [...mediumData].sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
  }
);
const mediumLib = benchmark(
  'sortObjArr (medium)',
  () => {
    sortObjArr(mediumData, 'value');
  }
);
console.log(`Difference: ${((mediumLib / mediumNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- Large Dataset (1,000 items) ---');
const largeNative = benchmark(
  'Native sort (large)',
  () => {
    [...largeData].sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
  },
  100
);
const largeLib = benchmark(
  'sortObjArr (large)',
  () => {
    sortObjArr(largeData, 'value');
  },
  100
);
console.log(`Difference: ${((largeLib / largeNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- Extra Large Dataset (10,000 items) ---');
const extraLargeNative = benchmark(
  'Native sort (extra large)',
  () => {
    [...extraLargeData].sort((a, b) => (a.value < b.value ? -1 : a.value > b.value ? 1 : 0));
  },
  10
);
const extraLargeLib = benchmark(
  'sortObjArr (extra large)',
  () => {
    sortObjArr(extraLargeData, 'value');
  },
  10
);
console.log(`Difference: ${((extraLargeLib / extraLargeNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- String Sorting (case-sensitive) ---');
const stringNative = benchmark(
  'Native sort (strings)',
  () => {
    [...mediumData].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  }
);
const stringLib = benchmark(
  'sortObjArr (strings)',
  () => {
    sortObjArr(mediumData, 'name');
  }
);
console.log(`Difference: ${((stringLib / stringNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- String Sorting (case-insensitive) ---');
const caseInsensitiveNative = benchmark(
  'Native sort (case-insensitive)',
  () => {
    [...mediumData].sort((a, b) => {
      const aVal = a.name.toLowerCase();
      const bVal = b.name.toLowerCase();
      return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
    });
  }
);
const caseInsensitiveLib = benchmark(
  'sortObjArr (case-insensitive)',
  () => {
    sortObjArr(mediumData, 'name', { caseinsensitive: true });
  }
);
console.log(`Difference: ${((caseInsensitiveLib / caseInsensitiveNative - 1) * 100).toFixed(1)}%\n`);

console.log('--- Descending Sort ---');
const descNative = benchmark(
  'Native sort (desc)',
  () => {
    [...mediumData].sort((a, b) => (a.value < b.value ? 1 : a.value > b.value ? -1 : 0));
  }
);
const descLib = benchmark(
  'sortObjArr (desc)',
  () => {
    sortObjArr(mediumData, 'value', 'desc');
  }
);
console.log(`Difference: ${((descLib / descNative - 1) * 100).toFixed(1)}%\n`);

console.log('=== Benchmark Complete ===');
