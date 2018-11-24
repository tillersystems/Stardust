import sortElementsInArray from '../sortElementsInArray';

describe('sortElementsInArray helpers', () => {
  it('should return 0', () => {
    const expectedValue = sortElementsInArray(1, 1);
    expect(expectedValue).toMatchSnapshot();
  });
  it('should return -1', () => {
    const expectedValue = sortElementsInArray(2, 1);
    expect(expectedValue).toMatchSnapshot();
  });
  it('should return 1', () => {
    const expectedValue = sortElementsInArray(1, 2);
    expect(expectedValue).toMatchSnapshot();
  });
});
