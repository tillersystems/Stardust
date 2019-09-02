import React from 'react';
import { fireEvent } from '@testing-library/react';

import Counter from '..';

describe('<Counter />', () => {
  test('should render without a problem', () => {
    const { container } = render(<Counter />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should increment counter', () => {
    const { getByTestId } = render(
      <Counter step={1} max={100} min={0} defaultValue={0} appearance="secondary" width="5rem" />,
    );
    const incrementButton = getByTestId('increment');
    const fakeinputValue = getByTestId('fakeinput');

    fireEvent.click(incrementButton);

    expect(fakeinputValue).toHaveTextContent('1');
  });

  test('should decrement counter', () => {
    const { getByTestId } = render(
      <Counter step={1} max={100} min={0} defaultValue={10} appearance="secondary" width="5rem" />,
    );
    const decrementButton = getByTestId('decrement');
    const fakeinputValue = getByTestId('fakeinput');

    fireEvent.click(decrementButton);

    expect(fakeinputValue).toHaveTextContent('9');
  });

  test('should decrement counter until the min value', () => {
    const { getByTestId } = render(
      <Counter step={1} max={100} min={0} defaultValue={99} appearance="secondary" width="5rem" />,
    );
    const incrementButton = getByTestId('increment');
    const fakeinputValue = getByTestId('fakeinput');

    expect(fakeinputValue).toHaveTextContent('99');

    fireEvent.click(incrementButton);

    expect(fakeinputValue).toHaveTextContent('100');

    fireEvent.click(incrementButton);

    expect(fakeinputValue).toHaveTextContent('100');
  });

  test('should decrement counter until the min value', () => {
    const { getByTestId } = render(
      <Counter step={1} max={100} min={0} defaultValue={1} appearance="secondary" width="5rem" />,
    );
    const decrementButton = getByTestId('decrement');
    const fakeinputValue = getByTestId('fakeinput');

    expect(fakeinputValue).toHaveTextContent('1');

    fireEvent.click(decrementButton);

    expect(fakeinputValue).toHaveTextContent('0');

    fireEvent.click(decrementButton);

    expect(fakeinputValue).toHaveTextContent('0');
  });

  test('should call onIncrement callback function', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Counter
        step={1}
        max={100}
        min={0}
        onIncrement={spy}
        defaultValue={10}
        appearance="secondary"
        width="5rem"
      />,
    );
    const incrementButton = getByTestId('increment');

    fireEvent.click(incrementButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should call onDecrement callback function', () => {
    const spy = jest.fn();
    const { getByTestId } = render(
      <Counter
        step={1}
        max={100}
        min={0}
        onDecrement={spy}
        defaultValue={10}
        appearance="secondary"
        width="5rem"
      />,
    );
    const decrementButton = getByTestId('decrement');

    fireEvent.click(decrementButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should increment counter when component is controlled', () => {
    let countValue = 0;

    const handleIncrement = count => {
      countValue = count;
    };

    const { getByTestId, rerender } = render(
      <Counter
        step={1}
        max={100}
        min={0}
        onIncrement={handleIncrement}
        count={countValue}
        appearance="secondary"
        width="5rem"
      />,
    );
    const incrementButton = getByTestId('increment');
    const fakeinputValue = getByTestId('fakeinput');

    fireEvent.click(incrementButton);

    rerender(
      <Counter
        step={1}
        max={100}
        min={0}
        onIncrement={handleIncrement}
        count={countValue}
        appearance="secondary"
        width="5rem"
      />,
    );

    expect(fakeinputValue).toHaveTextContent('1');
  });
});
