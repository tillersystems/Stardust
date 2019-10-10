import React from 'react';

import Footer from '..';

describe('<Modal.Footer />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Footer>Footer</Footer>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test.each`
    value              | props
    ${'flex-start'}    | ${'left'}
    ${'flex-end'}      | ${'right'}
    ${'center'}        | ${'center'}
    ${'space-between'} | ${'spaced'}
  `('should render with $props alignment', ({ value, props }) => {
    const { container } = render(<Footer alignment={props}>Footer</Footer>);

    expect(container.firstChild).toHaveStyleRule('justify-content', value);
  });
});
