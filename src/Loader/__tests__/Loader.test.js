import React from 'react';

import Loader from '..';
import Theme from '../../Theme';

describe('<Loader />', () => {
  test('should render without a problem ', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with another size ', () => {
    const size = '4rem';
    const { container } = render(<Loader width={size} height={size} />);

    expect(container.firstChild).toHaveAttribute('width', size);
    expect(container.firstChild).toHaveAttribute('height', size);
  });

  test('should render with another color ', () => {
    const { getByTestId } = render(<Loader color={Theme.palette.failure.default} />);
    const circleShapeNode = getByTestId('circleShape');

    expect(circleShapeNode).toHaveAttribute('stroke', Theme.palette.failure.default);
  });
});
