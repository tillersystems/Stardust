import React from 'react';
import Mockdate from 'mockdate';
import { DateTime, Settings } from 'luxon';
import { fireEvent } from '@testing-library/react';
import { transparentize } from 'polished';

import Week from '..';
import Theme from '../../../Theme';

Settings.defaultZoneName = 'utc';

describe('<Weeks />', () => {
  const dateValue = DateTime.fromObject({
    year: 2018,
    month: 7,
    day: 15,
    hour: 0,
    minute: 0,
    second: 0,
  });

  beforeEach(() => {
    // Mock date https://www.npmjs.com/package/mockdate
    // Mockdate.set(date, [timezoneOffset]);
    Mockdate.set(dateValue, 120);
  });

  afterEach(() => {
    // Reset mockdate
    Mockdate.reset();
  });

  test('should render without a problem', () => {
    const { container } = render(<Week currentDate={dateValue} selected={dateValue} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select a range date', () => {
    const startDate = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 16,
      hour: 0,
      minute: 0,
      second: 0,
    });
    const endDate = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 18,
      hour: 0,
      minute: 0,
      second: 0,
    });
    const { getByText } = render(
      <Week currentDate={dateValue} selected={dateValue} startDate={startDate} endDate={endDate} />,
    );

    const startDayNode = getByText('16');
    const endDayNode = getByText('18');

    expect(startDayNode).toHaveStyleRule('color', Theme.palette.white);
    expect(startDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
    expect(startDayNode).not.toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
    expect(startDayNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });

    expect(endDayNode).toHaveStyleRule('color', Theme.palette.white);
    expect(endDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
    expect(endDayNode).not.toHaveStyleRule(
      'background',
      transparentize(0.86, Theme.palette.primary.default),
    );
    expect(endDayNode).not.toHaveStyleRule('background', {
      modifier: ':hover',
    });
  });

  test('should handle onDateClick', () => {
    const dateSelected = DateTime.fromObject({
      year: 2018,
      month: 7,
      day: 20,
      hour: 0,
      minute: 0,
      second: 0,
    });
    const spy = jest.fn();
    const { getByText } = render(
      <Week currentDate={dateValue} selected={dateValue} onDateClick={spy} />,
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
        currentDate={dateValue}
        selected={dateValue}
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
      <Week currentDate={dateValue} selected={dateValue} onDateClick={spy} maxDate={dateValue} />,
    );

    const dayNode = getByText('20');

    // Click on a day
    fireEvent.click(dayNode);

    expect(spy).toHaveBeenCalledTimes(0);
  });
});
