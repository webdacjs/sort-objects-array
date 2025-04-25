/**
 * Returns an array of objects from the original array that are missing the specified key.
 * @param originalArray - The original array of objects.
 * @param key - The key to check for missing values.
 * @returns An array of objects from the original array that are missing the specified key.
 */
function getMissingVals(originalArray: Array<any>, key: string | number) {
    return originalArray.filter((x: { [x: string]: any; }) => !x[key]);
  }
  
  /**
   * Merges the sorted array with the missing objects from the original array based on the specified key.
   * @param originalArray - The original array of objects.
   * @param sortedArray - The sorted array of objects.
   * @param key - The key to merge on.
   * @returns The merged array with the missing objects.
   */
  export default function mergeWithMissing(originalArray: Array<any>, sortedArray: Array<any>, key: string) {
    const missing = getMissingVals(originalArray, key);
    return missing.length > 0 ? [...sortedArray, ...missing] : sortedArray;
  }