/**
 * Checks if the provided arguments are valid for sorting an array of objects.
 * @param arr - The array to be sorted.
 * @param key - The key to be used for sorting the array.
 * @returns A boolean value indicating whether the arguments are valid or not.
 */
import { isString } from './typeCheck';

export default function isValidArray(arr: any, key: any): boolean {
  return !Array.isArray(arr) || !isString(key);
}
