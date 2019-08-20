import React from 'react';
import 'jest-styled-components';

import Icon from '..';
import Theme from '../../Theme';

describe('<Icon />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Icon name="calendar" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render multipath icon', () => {
    const { container } = render(<Icon name="check-circle" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should display icon with a different name', () => {
    const { container } = render(<Icon name="check" />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should display icon with a different size', () => {
    const customSize = '50px';
    const { container } = render(<Icon name="calendar" size={customSize} />);

    expect(container.firstChild).toHaveAttribute('width', customSize);
    expect(container.firstChild).toHaveAttribute('height', customSize);
  });

  test('should display icon with a predifined color', () => {
    const { getByTestId } = render(<Icon name="calendar" color="darkBlue" />);

    expect(getByTestId('icon-svg-path')).toHaveAttribute('fill', Theme.palette.darkBlue);
  });

  test('should should display icon with a different color', () => {
    const customColor = 'hsl(120, 80%, 20%)';
    const { getByTestId } = render(<Icon name="calendar" color={customColor} />);

    expect(getByTestId('icon-svg-path')).toHaveAttribute('fill', customColor);
  });

  test('should render a title for standalone icon', () => {
    const title = 'brand logo';
    const { getByText } = render(<Icon name="tiller" title={title} />);

    expect(getByText(title)).toBeInTheDocument();
    expect(getByText(title)).toHaveAttribute('id');
  });
});
