/**
 * Return the offset position of a DOM element
 * @param {*} node DOM element
 *
 * @returns {object} offset position
 */
export const offset = node => {
  const rect = node.getBoundingClientRect();
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};
