import { isString } from './typeCheck';

export default function isValidArray(arr: any[], key: any): boolean {
  return !Array.isArray(arr) || !isString(key);
}