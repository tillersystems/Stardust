const TABLE_ROOT = '#root';

/**
 * Compare
 *
 * Compare function.
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
export const compare = (a, b) => (b > a ? 1 : b < a ? -1 : 0);

/**
 * Default transform function to use if non provided.
 *
 * @param {*} data
 */
export const defaultTransform = data =>
  data.map((item, key) => {
    return {
      key,
      item,
    };
  });

/**
 * Creates a sortFunction which sorts data depending on columns definitions of a table,
 * an index of column to sort on, and a direction
 *
 * @param {*} colsDef - columns definitions
 * @param {*} sortColumnIndex - index of column to sort with
 * @param {*} sortOrder - direction of sort
 */
export const sortDataBy = (colsDef, sort) => {
  /**
   * Returns a sorted array of items, nested in an object { key, item }
   * to preserve original index of rows
   *
   * @param {array} - The data to sort
   *
   * @return {array}
   */
  return data => {
    let sortedData = defaultTransform(data); // reuse logic of default transform

    if (sort && sort.column) {
      const sortColumnDef = colsDef.find(column => column.name === sort.column);

      if (sortColumnDef) {
        sortedData = sortedData.sort((a, b) => {
          const sortBy = sortColumnDef.sortBy || sortColumnDef.value;

          return (
            (sort.order === 'asc' ? -1 : sort.order === 'desc' ? 1 : 0) *
            compare(sortBy(a.item), sortBy(b.item))
          );
        });
      }
    }

    return sortedData;
  };
};

/**
 * Creates a flattenData function accepting a transform function (for sorting or filtering)
 *
 * @param {function} transform - any transform function returning objects like { key, item } for key in table
 */
export const flattenDataWith = (transform = defaultTransform) => {
  /**
   * Flattens the data to prepare a table with rows and theirs children associated with their depth.
   * @param {*} data
   * @param {*} depth
   * @param {*} parent
   */
  const recursiveFlattenData = (data, depth = 0, parent = TABLE_ROOT) =>
    transform(data).reduce((rows, { key: unsortedKey, item }) => {
      const key = `${parent}.${unsortedKey}`;
      const row = {
        parent,
        depth,
        key,
        item,
      };

      rows.push(row);

      if (item.children) {
        // Flatten also the children then appending it to rows.
        rows = rows.concat(recursiveFlattenData(item.children, depth + 1, key));
      }
      return rows;
    }, []);

  return recursiveFlattenData;
};

export const isRoot = value => value === TABLE_ROOT;
