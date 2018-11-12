import objectIsEmpty from '../objectIsEmpty';

describe('ObjectIsEmpty', () => {
  it('should return true', () => {
    const expected = objectIsEmpty({});

    expect(expected).toMatchSnapshot();
  });

  it('should return false', () => {
    const expected = objectIsEmpty({
      foo: 'bar',
    });

    expect(expected).toMatchSnapshot();
  });
});
