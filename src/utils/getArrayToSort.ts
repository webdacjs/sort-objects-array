import { convertObjectToArray, configParams } from './getsortutils';
import { isAnObject } from './typeCheck';

/**
 * Converts an array or object to a flat array for sorting.
 * If the second parameter is an object with a `flatten` property set to `true`, the array will be flattened.
 * If the first parameter is an object, it will be converted to an array using the `convertObjectToArray` function.
 * Otherwise, the original array will be returned.
 * 
 * @param arr - The array or object to convert.
 * @param orderOrConfig - The order or configuration object.
 * @returns The converted array.
 */
export default function getArrayToSort(arr: Array<any>, orderOrConfig: configParams) {
    if (orderOrConfig && isAnObject(orderOrConfig) && orderOrConfig.flatten) {
        return arr.flat();
    }
    else if (isAnObject(arr)) {
        return convertObjectToArray(arr)
    } else {
        return arr;
    }
}