import React from 'react';
import { fireEvent } from '@testing-library/react';

import Header from '..';

describe('Header', () => {
  test('should render without a problem', () => {
    const { container } = render(<Header />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should render with a title', () => {
    const title = 'Janvier 2019';
    const { getByText } = render(<Header title={title} />);

    const nodeTitle = getByText(title);

    expect(nodeTitle).toBeInTheDocument();
  });

  test('should have a previous month button disabled', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Header prev={spy} shouldDisablePrev />);

    const previousMonthButton = getByTestId('previous-month-button');

    expect(previousMonthButton).toHaveStyleRule('cursor', 'not-allowed');
    expect(previousMonthButton).toHaveStyleRule('opacity', '0.4');

    // Click on previous button
    fireEvent.click(previousMonthButton);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('should have a next month button disabled', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Header prev={spy} shouldDisableNext />);

    const nextMonthButton = getByTestId('next-month-button');

    expect(nextMonthButton).toHaveStyleRule('cursor', 'not-allowed');
    expect(nextMonthButton).toHaveStyleRule('opacity', '0.4');

    // Click on next button
    fireEvent.click(nextMonthButton);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('should respond to a click handler on previous month button', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Header prev={spy} />);

    const previousMonthButton = getByTestId('previous-month-button');

    // Click on previous button
    fireEvent.click(previousMonthButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should respond to a click handler on next month button', () => {
    const spy = jest.fn();
    const { getByTestId } = render(<Header next={spy} />);

    const nextMonthButton = getByTestId('next-month-button');

    // Click on next button
    fireEvent.click(nextMonthButton);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
