/**
 * isObjectEmpty
 *
 * Check if an object is empty
 *
 * @param {object} obj
 *
 * @return {boolean}
 */

function isObjectEmpty(obj) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export default isObjectEmpty;
