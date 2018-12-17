import React from 'react';
import Value from '..';

describe('<Value />', () => {
  test('should render withouth a problem', () => {
    const { container } = render(<Value>0</Value>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render as negative', () => {
    const { container } = render(<Value negative>-10</Value>);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render as postive', () => {
    const { container } = render(<Value positive>+10</Value>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
