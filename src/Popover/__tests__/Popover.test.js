import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';

import Popover from '..';

describe('<Popover />', () => {
  afterEach(cleanup);

  test('should render without a problem', () => {
    const { container } = render(<Popover content="content">Children</Popover>);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render open popover without a problem', () => {
    const { getByTestId } = render(
      <Popover content="content" isOpen>
        Trigger
      </Popover>,
    );
    const popoverNode = getByTestId('popover');

    expect(popoverNode).toBeInTheDocument();
  });

  test('should render with a different width', () => {
    const width = '10rem';
    const { getByTestId } = render(
      <Popover isOpen content="content" width={width}>
        Trigger
      </Popover>,
    );
    const popoverNode = getByTestId('popover');

    expect(popoverNode).toHaveStyleRule('width', width);
  });

  test('should trigger callback on click outside', () => {
    const wrapper = document.createElement('div');
    const externalElement = document.createTextNode('I am outside the popover');
    wrapper.appendChild(externalElement);
    document.body.appendChild(wrapper);

    const spy = jest.fn();
    const { getByText } = render(
      <Popover content="content" isOpen onClickOutside={spy}>
        Trigger
      </Popover>,
    );
    const outsideNode = getByText(/outside the popover/);

    fireEvent.click(outsideNode);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
