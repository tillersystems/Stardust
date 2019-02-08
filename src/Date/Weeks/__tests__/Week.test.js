import React from 'react';
import { DateTime } from 'luxon';
import { fireEvent } from 'react-testing-library';

import Week from '..';

describe('<Weeks />', () => {
  const dateValue = DateTime.fromObject({
    year: 2018,
    month: 7,
    day: 15,
    hour: 0,
    minute: 0,
    second: 0,
    zone: 'Europe/Paris',
  });

  test('should render without a problem', () => {
    const { container } = render(
      <Week
        currentMonth={dateValue}
        onDateClick={() => {}}
        selectedDate={dateValue}
        minDate={dateValue}
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should handle onDateClick', () => {
    const dateSelected = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 20,
      hour: 0,
      minute: 0,
      second: 0,
      zone: 'Europe/Paris',
    });
    const spy = jest.fn();
    const { getByText } = render(
      <Week
        currentMonth={dateValue}
        onDateClick={spy}
        selectedDate={dateValue}
        minDate={dateValue}
      />,
    );

    const dayNode = getByText('20');

    // Click on a day
    fireEvent.click(dayNode);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(dateSelected);
  });

  test('should not handle onDateClick if the selected day is before min date', () => {
    const spy = jest.fn();
    const { getByText } = render(
      <Week
        currentMonth={dateValue}
        onDateClick={spy}
        selectedDate={dateValue}
        minDate={dateValue}
      />,
    );

    const dayNode = getByText('10');

    // Click on a day
    fireEvent.click(dayNode);

    expect(spy).toHaveBeenCalledTimes(0);
  });

  test('should not handle onDateClick if the selected day is after max date', () => {
    const spy = jest.fn();
    const { getByText } = render(
      <Week
        currentMonth={dateValue}
        onDateClick={spy}
        selectedDate={dateValue}
        maxDate={dateValue}
      />,
    );

    const dayNode = getByText('20');

    // Click on a day
    fireEvent.click(dayNode);

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
