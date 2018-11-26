import compare from '../compare';

describe('sortElementsInArray helpers', () => {
  it('should return 0', () => {
    const expectedValue = compare(1, 1);
    expect(expectedValue).toMatchSnapshot();
  });
  it('should return -1', () => {
    const expectedValue = compare(2, 1);
    expect(expectedValue).toMatchSnapshot();
  });
  it('should return 1', () => {
    const expectedValue = compare(1, 2);
    expect(expectedValue).toMatchSnapshot();
  });
});
