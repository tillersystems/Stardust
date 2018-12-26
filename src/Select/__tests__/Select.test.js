import React from 'react';
import { fireEvent } from 'react-testing-library';

import Select from '..';

describe('<Select />', () => {
  test('should render without a problem', () => {
    const props = { title: 'title' };
    const { container } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when disabled', () => {
    const props = { title: 'title', disabled: true };
    const { container } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should toggle the Select', done => {
    const props = { title: 'title' };
    const { queryAllByText, getByText } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.title);

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    // Open Select
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    let ItemNode;
    ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(4);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    // Close Select
    fireEvent.click(button);

    setTimeout(() => {
      ItemNode = queryAllByText(/Item/);
      expect(button).toHaveAttribute('aria-expanded', 'false');
      expect(button).toHaveAttribute('aria-haspopup', 'true');
      expect(ItemNode[0]).toBeUndefined();
      expect(ItemNode[1]).toBeUndefined();
      expect(ItemNode[2]).toBeUndefined();
      done();
    }, 500);
  });

  test('should call onToggle when Select is toggled', () => {
    const spy = jest.fn();
    const props = { title: 'title', onToggle: spy };
    const { getByText } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.title);

    // Open Select
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    // Close Select
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });

  test('should call onSelected when an item option is selected', () => {
    const spy = jest.fn();
    const props = { title: 'title', onSelected: spy };
    const { queryAllByText, getByText } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.title);

    // Open Select
    fireEvent.click(button);

    const ItemNode = queryAllByText(/Item/);

    // Click on first item node
    fireEvent.click(ItemNode[0]);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('Item');
  });

  test('should call getDerivedStateFromProps', () => {
    const props = { title: 'title', resetTitle: false };
    const { container, rerender } = render(
      <Select {...props}>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toBeInTheDocument();

    rerender(
      <Select {...props} resetTitle>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
        <Select.Option>Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });
});
