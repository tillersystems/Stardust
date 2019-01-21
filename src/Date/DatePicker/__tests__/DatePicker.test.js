import React from 'react';
import * as Luxon from 'luxon';
import { fireEvent } from 'react-testing-library';

import DatePicker from '..';

describe('<DatePicker />', () => {
  const mockLocalDateTime = Luxon.DateTime.fromObject({
    year: 2018,
    month: 7,
    day: 15,
    hour: 0,
    minute: 0,
    second: 0,
    zone: 'Europe/Paris',
  });

  beforeEach(() => {
    Luxon.DateTime.local = jest.fn().mockImplementation(() => mockLocalDateTime);
  });

  test('should render withouth a problem', () => {
    const { container } = render(
      <DatePicker minDate={mockLocalDateTime} defaultValue={mockLocalDateTime} />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select a date', () => {
    const { getByText } = render(<DatePicker defaultValue={mockLocalDateTime} />);

    const daySelected = getByText('20');

    // Click on previous month button
    fireEvent.click(daySelected);

    expect(daySelected).toBeInTheDocument();
  });

  test('should handle previous month', () => {
    const { getByTestId, getByText } = render(<DatePicker defaultValue={mockLocalDateTime} />);

    const previousMonthButton = getByTestId('previous-month-button');

    // Click on previous month button
    fireEvent.click(previousMonthButton);

    const excpectedMonth = getByText(/June/);

    expect(excpectedMonth).toBeInTheDocument();
  });

  test('should handle next month', () => {
    const { getByTestId, getByText } = render(<DatePicker defaultValue={mockLocalDateTime} />);

    const nextMonthButton = getByTestId('next-month-button');

    // Click on previous month button
    fireEvent.click(nextMonthButton);

    const excpectedMonth = getByText(/August/);

    expect(excpectedMonth).toBeInTheDocument();
  });

  test('should handle mouse Leave', () => {
    const { container } = render(<DatePicker defaultValue={mockLocalDateTime} />);

    // Mouse Leave on DatePicker
    fireEvent.mouseLeave(container.firstChild);

    expect(container.firstChild).toBeInTheDocument();
  });
});
