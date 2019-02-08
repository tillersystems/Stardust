import React from 'react';
import 'jest-styled-components';
import * as Luxon from 'luxon';
import { fireEvent } from 'react-testing-library';

import DateRangePicker from '..';

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

  it('should render without a problem', () => {
    const { container } = render(<DateRangePicker minDate={mockLocalDateTime} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select a range date', () => {
    const { getByText } = render(<DateRangePicker maxDate={mockLocalDateTime} />);

    const dayfrom = getByText('10');
    const dayTo = getByText('12');

    // Click on first range day
    fireEvent.click(dayfrom);

    // Click on last range day
    fireEvent.click(dayTo);

    expect(dayfrom).toBeInTheDocument();
    expect(dayTo).toBeInTheDocument();
  });

  it('should handle previous month', () => {
    const { getByTestId, getByText } = render(<DateRangePicker />);

    const previousMonthButton = getByTestId('previous-month-button');

    // Click on previous month button
    fireEvent.click(previousMonthButton);

    const expectedMonth = getByText(/June/);

    expect(expectedMonth).toBeInTheDocument();

    expect(render).toMatchSnapshot();
  });

  it('should handle next month', () => {
    const { getByTestId, getByText } = render(<DateRangePicker />);

    const nextMonthButton = getByTestId('next-month-button');

    // Click on previous month button
    fireEvent.click(nextMonthButton);

    const expectedMonth = getByText(/August/);

    expect(expectedMonth).toBeInTheDocument();
  });

  test('should handle mouse Leave', () => {
    const { container } = render(<DateRangePicker />);

    // Mouse Leave on DatePicker
    fireEvent.mouseLeave(container.firstChild);

    expect(container.firstChild).toBeInTheDocument();
  });
});
