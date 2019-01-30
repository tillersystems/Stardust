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

  test('should render with rounded corners', () => {
    // mock getBBox() which doesn't exist in jsdom to get the dimensions and position of the flag
    if (!SVGElement.prototype.getBBox) {
      SVGElement.prototype.getBBox = () => ({ height: 336, width: 450, x: 31, y: 88 });
    }

    const { container } = render(<Flag name="fr" rounded />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
