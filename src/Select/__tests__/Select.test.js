import React from 'react';
import { fireEvent, wait } from '@testing-library/react';

import Select from '..';

jest.mock('popper.js');

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
    const { container, queryAllByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    const button = container.querySelector('button');

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

  test('should display the first option when no placeholder nor value is provided', () => {
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

  test('should have a value set by parent', () => {
    const props = { value: '3' };
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

  test('should update its value accordingly', async () => {
    const { container, queryByText, getByText, rerender } = render(
      <Select>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
        <Select.Option value="4">Item 4</Select.Option>
      </Select>,
    );

    const buttonNode = container.querySelector('button');
    expect(buttonNode).toHaveAttribute('aria-expanded', 'false');

    let firstOption = getByText('Item 1');
    let thirdOption = queryByText('Item 3');
    expect(firstOption).toBeInTheDocument();
    expect(thirdOption).not.toBeInTheDocument();

    // open select and pick another option
    fireEvent.click(buttonNode);
    thirdOption = getByText('Item 3');
    fireEvent.click(thirdOption);

    await wait(() => {
      firstOption = queryByText('Item 1');
      expect(firstOption).not.toBeInTheDocument();
      // get current option displayed in the button
      thirdOption = getByText('Item 3');
      expect(thirdOption).toBeInTheDocument();

      const props = { value: '2' };
      rerender(
        <Select {...props}>
          <Select.Option value="1">Item 1</Select.Option>
          <Select.Option value="2">Item 2</Select.Option>
          <Select.Option value="3">Item 3</Select.Option>
          <Select.Option value="4">Item 4</Select.Option>
        </Select>,
      );

      const secondOption = getByText('Item 2');
      expect(secondOption).toBeInTheDocument();
      firstOption = queryByText('Item 1');
      expect(firstOption).not.toBeInTheDocument();
      thirdOption = queryByText('Item 3');
      expect(thirdOption).not.toBeInTheDocument();
    });
  });
});
