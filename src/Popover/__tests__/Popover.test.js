import React from 'react';

import Popover from '..';

describe('<Popover />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Popover>Children</Popover>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render open popover without a problem', () => {
    const { getByTestId } = render(<Popover active>Children</Popover>);
    const popoverNode = getByTestId('popover');

    expect(popoverNode).toBeInTheDocument();
  });

  test('should render with a different width', () => {
    const width = '10rem';
    const { getByTestId } = render(
      <Popover active width={width}>
        Children
      </Popover>,
    );
    const popoverNode = getByTestId('popover');

    expect(popoverNode).toHaveStyleRule('width', width);
  });
});
