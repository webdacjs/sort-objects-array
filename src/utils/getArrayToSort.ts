import { objToArray, configParams } from './getsortutils';
import { isAnObject } from './typeCheck';


export default function getArrayToSort(arr: Array<any>, orderOrConfig: configParams) {
    if (orderOrConfig && isAnObject(orderOrConfig) && orderOrConfig.flatten) {
        return arr.flat();
    }
    else if (isAnObject(arr)) {
        return objToArray(arr)
    } else {
        return arr;
    }
}