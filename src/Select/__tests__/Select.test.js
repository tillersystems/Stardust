import React from 'react';
import { fireEvent } from 'react-testing-library';

import Select from '..';

describe('<Select />', () => {
  test('should render without a problem', () => {
    const props = { placeholder: 'placeholder' };
    const { container } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render without a problem when disabled', () => {
    const props = { placeholder: 'placeholder', disabled: true };
    const { container } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should toggle the Select', done => {
    const props = { placeholder: 'placeholder' };
    const { queryAllByText, getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.placeholder);

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
    const props = { placeholder: 'placeholder', onToggle: spy };
    const { getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.placeholder);

    // Open Select
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    // Close Select
    fireEvent.click(button);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });

  test('should call onChange when an item option is selected', () => {
    const spy = jest.fn();
    const props = { placeholder: 'placeholder', onChange: spy };
    const { queryAllByText, getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.placeholder);

    // Open Select
    fireEvent.click(button);

    const ItemNode = queryAllByText(/Item/);

    // Click on first item node
    fireEvent.click(ItemNode[0]);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith('1');
  });

  test('should call getDerivedStateFromProps', () => {
    const props = { placeholder: 'placeholder', resetValue: false };
    const { container, rerender } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toBeInTheDocument();

    rerender(
      <Select {...props} resetValue>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toBeInTheDocument();
  });

  test('should have a custom width', () => {
    const props = { width: '200px' };
    const { container } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    expect(container.firstChild).toHaveStyleRule('width', props.width);
  });

  test('should display the first option when no placeholder nor initial value is provided', () => {
    const { getByText } = render(
      <Select>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
        <Select.Option value="4">Item 4</Select.Option>
      </Select>,
    );

    const displayedOption = getByText('Item 1');
    expect(displayedOption).toBeInTheDocument();
  });

  test('should have an initial value', () => {
    const props = { initialValue: '3' };
    const { getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
        <Select.Option value="4">Item 4</Select.Option>
      </Select>,
    );

    const displayedOption = getByText('Item 3');
    expect(displayedOption).toBeInTheDocument();
  });
});
