import React from 'react';

import Popover from '..';

describe('<Popover />', () => {
  it('should render withouth a problem', () => {
    const { container } = render(<Popover>Children</Popover>);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render open popover withouth a problem', () => {
    const { getByTestId } = render(<Popover active>Children</Popover>);
    const popoverNode = getByTestId('popover');

    expect(popoverNode).toBeInTheDocument();
  });

  it('should render with a different width', () => {
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
