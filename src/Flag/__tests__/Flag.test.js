import React from 'react';

import Flag from '..';

describe('<Flag />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Flag name="fr" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with different size', () => {
    const customSize = '50';
    const { getByTestId } = render(<Flag name="fr" size={customSize} />);
    const flagSvgNode = getByTestId('flagSvg');

    expect(flagSvgNode).toHaveAttribute('width', customSize);
    expect(flagSvgNode).toHaveAttribute('height', customSize);
  });
});
