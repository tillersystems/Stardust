import React from 'react';
import 'jest-styled-components';

import Logo from '..';

describe('<Logo />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with custom width & height', () => {
    const { getByTestId } = render(<Logo width="300" height="80" />);
    const logoNode = getByTestId('logo');
    expect(logoNode).toHaveAttribute('width', '300');
    expect(logoNode).toHaveAttribute('height', '80');
  });

  test('should render with custom color', () => {
    const color = 'hsl(217, 89%, 61%)';
    const { getByTestId } = render(<Logo color={color} />);
    const logoPathNode = getByTestId('logoPath');
    expect(logoPathNode).toHaveAttribute('fill', color);
  });
});
