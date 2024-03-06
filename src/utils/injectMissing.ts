function getMissingVals<T>(originalArray: T[], key: keyof T): T[] {
  return originalArray.filter(x => !x[key]);
}

export default function mergeWithMissing<T>(originalArray: T[], sortedArray: T[], key: keyof T): T[] {
  const missing = getMissingVals(originalArray, key);
  return missing.length > 0 ? [...sortedArray, ...missing] : sortedArray;
}