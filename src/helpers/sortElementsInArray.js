/**
 * Sort elements in array
 *
 * Compare function in order to sort an array of objects.
 *
 * Function should always return a number, either positive, negative or 0
 * If the return number is negative, A will be shown before B.
 * If the return number is positive, B will be shown before A.
 * If the return number is 0, A and B will remain in the same order as when they entered the loop.
 *
 * @param {string, number} a
 * @param {string, number} b
 *
 * @return {number}
 */

export default function sortElementsInArray(a, b) {
  if (b < a) {
    return -1;
  }
  if (b > a) {
    return 1;
  }
  return 0;
}
