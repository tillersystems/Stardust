import React from 'react';
import { fireEvent, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Dropdown from '..';

jest.mock('popper.js');

describe('<Dropdown />', () => {
  test('should render without a problem', () => {
    const props = { title: 'title' };
    const { container } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should toggle the dropdown', async () => {
    const props = { title: 'title' };
    const { container, queryAllByText } = render(
      <Dropdown {...props}>
        <div>Item1</div>
        <div>Item2</div>
        <div>Item3</div>
      </Dropdown>,
    );
    const button = container.querySelector('button');

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    act(() => {
      // Open Dropdown
      fireEvent.click(button);
    });

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    const ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(3);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    act(() => {
      // Close Dropdown
      fireEvent.click(button);
    });

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    const ItemNodeRemoved = await waitForElementToBeRemoved(() => queryAllByText(/Item/));
    expect(ItemNodeRemoved[0]).toBeUndefined();
    expect(ItemNodeRemoved[1]).toBeUndefined();
    expect(ItemNodeRemoved[2]).toBeUndefined();
  });

  test('should render children', () => {
    const { container, getByText } = render(
      <Dropdown title="Title">
        <div>Hello !</div>
      </Dropdown>,
    );

    act(() => {
      const button = container.querySelector('button');
      fireEvent.click(button);
    });

    const oberkampf = getByText(/hello !/i);
    expect(oberkampf).toBeInTheDocument();
  });

  test('should render an OptionsList if no children', () => {
    const options = [
      { value: 'street-bangkok-st-louis', label: 'Street Bangkok St louis', disabled: false },
      { value: 'street-bangkok-st-michel', label: 'Street Bangkok St Michel', disabled: false },
      { value: 'street-bangkok-oberkampf', label: 'Street Bangkok Oberkampf', disabled: false },
    ];

    const { container, getByText } = render(
      <Dropdown allowMultiple options={options} title="Title" values={[]} />,
    );

    act(() => {
      const button = container.querySelector('button');
      fireEvent.click(button);
    });

    const oberkampf = getByText(/oberkampf/i);
    expect(oberkampf).toBeInTheDocument();
  });
});
