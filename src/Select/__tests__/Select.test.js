import React from 'react';
import { act, fireEvent, waitForElement, waitForElementToBeRemoved } from '@testing-library/react';

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

  test('should toggle the Select', async () => {
    const props = { placeholder: 'placeholder' };
    const { container, queryAllByText, getAllByText } = render(
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

    act(() => {
      // Open Select
      fireEvent.click(button);
    });

    expect(button).toHaveAttribute('aria-expanded', 'true');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    let ItemNode = queryAllByText(/Item/);

    expect(ItemNode).toHaveLength(4);
    expect(ItemNode[0]).toBeInTheDocument();
    expect(ItemNode[1]).toBeInTheDocument();
    expect(ItemNode[2]).toBeInTheDocument();

    act(() => {
      // Close Select
      fireEvent.click(button);
    });

    await waitForElementToBeRemoved(() => getAllByText(/Item/));

    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(button).toHaveAttribute('aria-haspopup', 'true');

    ItemNode = queryAllByText(/Item/);

    expect(ItemNode[0]).toBeUndefined();
    expect(ItemNode[1]).toBeUndefined();
    expect(ItemNode[2]).toBeUndefined();
  });

  test('should update its value accordingly', async () => {
    const { container, queryByText, getByText } = render(
      <Select>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
        <Select.Option value="4">Item 4</Select.Option>
      </Select>,
    );
    let Item1, Item2, Item3;

    const buttonNode = container.querySelector('button');
    expect(buttonNode).toHaveAttribute('aria-expanded', 'false');

    act(() => {
      // open select and pick another option
      fireEvent.click(buttonNode);
    });

    // Wait for the select to open
    Item3 = await waitForElement(() => getByText('Item 3'));

    act(() => {
      // Select the third items
      fireEvent.click(Item3);
    });

    // Wait for the select to close
    await waitForElementToBeRemoved(() => getByText('Item 1'));

    Item1 = queryByText('Item 1');
    Item3 = getByText('Item 3');

    expect(Item1).not.toBeInTheDocument();
    expect(Item3).toBeInTheDocument();

    act(() => {
      // open select and pick another option
      fireEvent.click(buttonNode);
    });

    Item2 = await waitForElement(() => getByText('Item 2'));

    act(() => {
      // Select the second items
      fireEvent.click(Item2);
    });

    // Wait for the select to close
    await waitForElementToBeRemoved(() => getByText('Item 3'));

    Item3 = queryByText('Item 3');
    Item2 = getByText('Item 2');

    expect(Item3).not.toBeInTheDocument();
    expect(Item2).toBeInTheDocument();
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

    act(() => {
      // Open Select
      fireEvent.click(button);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(true);

    act(() => {
      // Close Select
      fireEvent.click(button);
    });

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy).toHaveBeenCalledWith(false);
  });

  test('should call onChange when an item option is selected', () => {
    const spy = jest.fn();
    const props = { placeholder: 'placeholder', onChange: spy, values: [] };
    const { queryAllByText, getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item</Select.Option>
        <Select.Option value="2">Item</Select.Option>
        <Select.Option value="3">Item</Select.Option>
        <Select.Option value="4">Item</Select.Option>
      </Select>,
    );

    const button = getByText(props.placeholder);

    act(() => {
      // Open Select
      fireEvent.click(button);
    });

    const ItemNode = queryAllByText(/Item/);

    act(() => {
      // Click on first item node
      fireEvent.click(ItemNode[0]);
    });

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(['1']);
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

  test('should have a value set by parent', () => {
    const props = { values: ['3'] };
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

  test('should display displayedValue prop', () => {
    const displayValue = selected =>
      selected.length ? `The current value is ${selected[0].value}` : 'No value';

    const props = {
      values: ['3'],
      displayValue,
    };

    const { getByText } = render(
      <Select {...props}>
        <Select.Option value="1">Item 1</Select.Option>
        <Select.Option value="2">Item 2</Select.Option>
        <Select.Option value="3">Item 3</Select.Option>
        <Select.Option value="4">Item 4</Select.Option>
      </Select>,
    );

    const displayedText = getByText('The current value is 3');
    expect(displayedText).toBeInTheDocument();
  });
});
