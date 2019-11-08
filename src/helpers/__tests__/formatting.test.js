import { formatNumber } from '../formatting';

describe('formatNumber', () => {
  test('should return percentage without digits', () => {
    const formattedNumber = formatNumber({
      locale: 'en-US',
      number: -0.2114,
      percent: true,
      digits: 0,
    });

    expect(formattedNumber).toBe('-21%');
  });

  test('should return percentage with 2 digits', () => {
    const formattedNumber = formatNumber({
      locale: 'en-US',
      number: -0.2114,
      percent: true,
      digits: 2,
    });

    expect(formattedNumber).toBe('-21.14%');
  });

  test('should return price in dollars with 2 digits', () => {
    const formattedNumber = formatNumber({
      locale: 'en-US',
      number: 2114.34,
      digits: 2,
      currency: 'USD',
    });

    expect(formattedNumber).toBe('$21.14');
  });
});
