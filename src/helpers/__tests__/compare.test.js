import compare from '../compare';

describe('sortElementsInArray helpers', () => {
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
