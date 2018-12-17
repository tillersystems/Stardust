import React from 'react';
import 'jest-styled-components';

import Icon from '..';
import Theme from '../../Theme';

describe('<Icon />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Icon name="calendar" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with different name', () => {
    const { container } = render(<Icon name="check" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with different size', () => {
    const customSize = '2rem';
    const { getByTestId } = render(<Icon name="calendar" width={customSize} height={customSize} />);
    const iconSvgNode = getByTestId('iconSvg');
    const iconNode = getByTestId('iconContainer');

    expect(iconSvgNode).toHaveAttribute('width', customSize);
    expect(iconSvgNode).toHaveAttribute('height', customSize);
    expect(iconNode).toHaveStyleRule('font-size', customSize);
    expect(iconNode).toHaveStyleRule('line-height', customSize);
  });

  test('should render with predifined color', () => {
    const { getByTestId } = render(<Icon name="calendar" color="darkBlue" />);
    const iconSvgPathNode = getByTestId('iconSvgPath');

    expect(iconSvgPathNode).toHaveAttribute('fill', Theme.palette.darkBlue);
  });

  test('should render with different color', () => {
    const customColor = 'hsl(120, 80%, 20%)';
    const { getByTestId } = render(<Icon name="calendar" color={customColor} />);
    const iconSvgPathNode = getByTestId('iconSvgPath');

    expect(iconSvgPathNode).toHaveAttribute('fill', customColor);
  });

  test('should render with a spin loader', () => {
    const { container } = render(<Icon name="calendar" spin />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
