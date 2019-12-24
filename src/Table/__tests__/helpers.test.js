import { compare, defaultTransform, sortDataBy, flattenDataWith } from '../helpers';

describe('compare helpers', () => {
  it('should return 0', () => {
    const compareNumber = compare(1, 1);
    expect(compareNumber).toBe(0);

    const compareString = compare('Anakin', 'Anakin');
    expect(compareString).toBe(0);
  });
  it('should return -1', () => {
    const compareNumber = compare(2, 1);
    expect(compareNumber).toBe(-1);

    const compareString = compare('Luke', 'Anakin');
    expect(compareString).toBe(-1);
  });
  it('should return 1', () => {
    const compareNumber = compare(1, 2);
    expect(compareNumber).toBe(1);

    const compareString = compare('Anakin', 'Luke');
    expect(compareString).toBe(1);
  });
});

describe('defaultTransform', () => {
  it('should wrap elements with index as key and element as item', () => {
    const data = [{ value: 'A' }, { value: 'B' }, { value: 'C' }];

    expect(defaultTransform(data)).toEqual([
      { key: 0, item: { value: 'A' } },
      { key: 1, item: { value: 'B' } },
      { key: 2, item: { value: 'C' } },
    ]);
  });
});

describe('sortDataBy', () => {
  // Note: In case of equality, keeps order of appearance in array
  const data = [
    { label: 'Z', value: 'A' },
    { label: 'X', value: 'A' },
    { label: 'X', value: 'C' },
    { label: 'Y', value: 'B' },
    { nothing: null },
  ];

  const customSortValues = {
    B: 1,
    C: 2,
    A: 3,
  };

  const colsDef = [
    {
      title: 'LABEL',
      value: item => item.label,
    },
    {
      title: 'VALUE',
      value: item => item.value,
    },
    {
      title: 'CUSTOM',
      value: item => item,
      filteredBy: itemValue => customSortValues[itemValue.value] || 0, // use custom sort values
    },
  ];

  it('should not sort data', () => {
    const sort = sortDataBy(colsDef);

    expect(sort(data)).toEqual(defaultTransform(data));
  });

  it('should sort data by label ASC', () => {
    const sort = sortDataBy(colsDef, 0, 'asc');

    expect(sort(data)).toEqual([
      { key: 1, item: { label: 'X', value: 'A' } },
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 4, item: { nothing: null } },
    ]);
  });
  it('should sort data by label DESC', () => {
    const sort = sortDataBy(colsDef, 0, 'desc');

    expect(sort(data)).toEqual([
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 1, item: { label: 'X', value: 'A' } },
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 4, item: { nothing: null } },
    ]);
  });

  it('should sort data by value ASC', () => {
    const sort = sortDataBy(colsDef, 1, 'asc');

    expect(sort(data)).toEqual([
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 1, item: { label: 'X', value: 'A' } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 4, item: { nothing: null } },
    ]);
  });

  it('should sort data by value DESC', () => {
    const sort = sortDataBy(colsDef, 1, 'desc');

    expect(sort(data)).toEqual([
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 1, item: { label: 'X', value: 'A' } },
      { key: 4, item: { nothing: null } },
    ]);
  });

  it('should sort data by custom ASC', () => {
    const sort = sortDataBy(colsDef, 2, 'asc');

    expect(sort(data)).toEqual([
      { key: 4, item: { nothing: null } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 1, item: { label: 'X', value: 'A' } },
    ]);
  });

  it('should sort data by custom DESC', () => {
    const sort = sortDataBy(colsDef, 2, 'desc');

    expect(sort(data)).toEqual([
      { key: 0, item: { label: 'Z', value: 'A' } },
      { key: 1, item: { label: 'X', value: 'A' } },
      { key: 2, item: { label: 'X', value: 'C' } },
      { key: 3, item: { label: 'Y', value: 'B' } },
      { key: 4, item: { nothing: null } },
    ]);
  });
});

describe('flattenDataWith', () => {
  it('should return a function', () => {
    expect(typeof flattenDataWith()).toBe('function');
  });

  it('should return a flatten function which unfolds all children with depth', () => {
    const nestedData = [
      {
        value: 'A',
        children: [{ value: 'A1' }, { value: 'A2' }, { value: 'A3' }],
      },
      {
        value: 'B',
        children: [
          { value: 'B1', children: [{ value: 'B1.1' }, { value: 'B1.2' }, { value: 'B1.3' }] },
          { value: 'B2', children: [{ value: 'B2.1' }, { value: 'B2.2' }, { value: 'B2.3' }] },
        ],
      },
    ];
    const flatten = flattenDataWith();

    expect(flatten(nestedData)).toEqual([
      { key: '#root.0', parent: '#root', depth: 0, item: nestedData[0] },
      { key: '#root.0.0', parent: '#root.0', depth: 1, item: nestedData[0].children[0] },
      { key: '#root.0.1', parent: '#root.0', depth: 1, item: nestedData[0].children[1] },
      { key: '#root.0.2', parent: '#root.0', depth: 1, item: nestedData[0].children[2] },
      { key: '#root.1', parent: '#root', depth: 0, item: nestedData[1] },
      { key: '#root.1.0', parent: '#root.1', depth: 1, item: nestedData[1].children[0] },
      {
        key: '#root.1.0.0',
        parent: '#root.1.0',
        depth: 2,
        item: nestedData[1].children[0].children[0],
      },
      {
        key: '#root.1.0.1',
        parent: '#root.1.0',
        depth: 2,
        item: nestedData[1].children[0].children[1],
      },
      {
        key: '#root.1.0.2',
        parent: '#root.1.0',
        depth: 2,
        item: nestedData[1].children[0].children[2],
      },
      { key: '#root.1.1', parent: '#root.1', depth: 1, item: nestedData[1].children[1] },
      {
        key: '#root.1.1.0',
        parent: '#root.1.1',
        depth: 2,
        item: nestedData[1].children[1].children[0],
      },
      {
        key: '#root.1.1.1',
        parent: '#root.1.1',
        depth: 2,
        item: nestedData[1].children[1].children[1],
      },
      {
        key: '#root.1.1.2',
        parent: '#root.1.1',
        depth: 2,
        item: nestedData[1].children[1].children[2],
      },
    ]);
  });
});
