import { DateTime, Settings, Interval } from 'luxon';
import Mockdate from 'mockdate';

import {
  getPreviousMonth,
  getNextMonth,
  isSameDay,
  isSameMonth,
  isInNextMonth,
  isInPrevMonth,
  isInterval,
  getCalendarDates,
} from '../helpers';

Settings.defaultZoneName = 'utc';

describe('Helpers', () => {
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

  test('should return the month and year before the given month and year', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5 });
    const prevMonth = getPreviousMonth(date);

    expect(prevMonth.month).toBe(4);
  });

  test('should return the month and year after the given month and year', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5 });
    const nextMonth = getNextMonth(date);

    expect(nextMonth.month).toBe(6);
  });

  test('should return true if two date values are the same day', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const anotherDate = DateTime.fromObject({ year: 1982, month: 5, day: 2 });

    expect(isSameDay(date, date)).toBeTruthy();
    expect(isSameDay(date, anotherDate)).toBeFalsy();
  });

  test('should return true if two date values are the in the same month', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const dateInSameMonth = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const dateInNotSameMonth = DateTime.fromObject({ year: 1982, month: 6, day: 2 });

    expect(isSameMonth(date, dateInSameMonth)).toBeTruthy();
    expect(isSameMonth(date, dateInNotSameMonth)).toBeFalsy();
  });

  test('should return true whether the selected date is in the next month', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const selectedDate = DateTime.fromObject({ year: 1982, month: 6, day: 1 });
    const anotherSelectedDate = DateTime.fromObject({ year: 1982, month: 2, day: 1 });

    expect(isInNextMonth(selectedDate, date)).toBeTruthy();
    expect(isInNextMonth(anotherSelectedDate, date)).toBeFalsy();
  });

  test('should return true whether the selected date is in the next month', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const selectedDate = DateTime.fromObject({ year: 1982, month: 4, day: 1 });
    const anotherSelectedDate = DateTime.fromObject({ year: 1982, month: 2, day: 1 });

    expect(isInPrevMonth(selectedDate, date)).toBeTruthy();
    expect(isInPrevMonth(anotherSelectedDate, date)).toBeFalsy();
  });

  test('should return an array of the calendar dates', () => {
    const date = DateTime.fromObject({ year: 1982, month: 5, day: 1 });

    expect(getCalendarDates(date)).toMatchSnapshot();
  });

  test('should check if an object is an Interval', () => {
    const from = DateTime.fromObject({ year: 1982, month: 5, day: 1 });
    const to = DateTime.fromObject({ year: 1982, month: 5, day: 3 });
    const notAnIntervalObject = from;
    const intervalObject = Interval.fromDateTimes(from, to);

    expect(isInterval(notAnIntervalObject)).toMatchSnapshot();
    expect(isInterval(intervalObject)).toMatchSnapshot();
  });
});
