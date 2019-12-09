import { DateTime, Interval } from 'luxon';

const CALENDAR_WEEKS = 6; // Weeks displayed on calendar

/**
 * Get previous month
 * Gets the month and year before the given month and year
 *
 * @param {luxon.DateTime} date - A date value
 *
 * @return {luxon.DateTime}
 */
export const getPreviousMonth = date => date.minus({ month: 1 });

/**
 * Get next month
 * Gets the month and year after the given month and year
 *
 * @param {luxon.DateTime} date - A date value
 *
 * @return {luxon.DateTime}
 */
export const getNextMonth = date => date.plus({ month: 1 });

/**
 * Is same day
 * Checks if two date values are the same day
 *
 * @param {luxon.DateTime} date - A date value
 * @param {luxon.DateTime} currentDate - A date value
 *
 * @return {boolean}
 */
export const isSameDay = (date, currentDate) => date.hasSame(currentDate, 'day');

/**
 * Is same month
 * Checks if two date values are the in the same month
 *
 * @param {luxon.DateTime} date - A date value
 * @param {luxon.DateTime} currentDate - A date value
 *
 * @return {boolean}
 */
export const isSameMonth = (date, currentDate) => date.hasSame(currentDate, 'month');

/**
 * Is in next month
 * Whether the selected date is in the next month w.r.t. the whole calendar
 *
 * @param {luxon.DateTime} date - A date value
 * @param {luxon.DateTime} currentDate - A date value
 *
 * @return {boolean}
 */
export const isInNextMonth = (date, currentDate) => {
  const monthStart = date.startOf('month');
  return monthStart.hasSame(currentDate.plus({ month: 1 }), 'month');
};

/**
 * Is in pervious month
 * Whether the selected date is in the pervious month
 *
 * @param {luxon.DateTime} date - A date value
 * @param {luxon.DateTime} currentDate - A date value
 *
 * @return {boolean}
 */
export const isInPrevMonth = (date, currentDate) => {
  const monthEnd = date.endOf('month');
  return monthEnd.hasSame(currentDate.minus({ month: 1 }), 'month');
};

/**
 * Is interval
 * Check if an object is an Interval
 *
 * @param {object} value
 *
 * @return {boolean}
 */
export const isInterval = value => Interval.isInterval(value);

/**
 * Calendar builder for a month in the specified year
 * Returns an array of the calendar dates.
 * Each calendar date is represented as an object => {YYYY, MM, DD}
 *
 * @param {luxon.DateTime} date - A date value
 *
 * @return {array}
 */
export const getCalendarDates = date => {
  const { daysInMonth, year, month } = date;

  // Get the month's first day
  const startOfMonth = date.startOf('month');
  const monthFirstDay = DateTime.fromISO(startOfMonth).weekday;

  // Get number of days to be displayed from previous and next months
  // These ensure a total of 42 days (6 weeks) displayed on the calendar
  const daysFromPrevMonth = monthFirstDay - 1;
  const daysFromNextMonth = CALENDAR_WEEKS * 7 - (daysFromPrevMonth + daysInMonth);

  // Get the previous and next months and years
  const { month: prevMonth, year: prevMonthYear } = getPreviousMonth(date);
  const { month: nextMonth, year: nextMonthYear } = getNextMonth(date);

  // Get number of days in previous month
  const prevMonthDays = date.minus({ month: 1 }).daysInMonth;

  // Builds dates to be displayed from previous month
  const prevMonthDates = [...new Array(daysFromPrevMonth)].map((n, index) => {
    const day = index + 1 + (prevMonthDays - daysFromPrevMonth);
    return { year: prevMonthYear, month: prevMonth, day };
  });

  // Builds dates to be displayed from current month
  const thisMonthDates = [...new Array(daysInMonth)].map((n, index) => {
    const day = index + 1;
    return { year, month, day };
  });

  // Builds dates to be displayed from next month
  const nextMonthDates = [...new Array(daysFromNextMonth)].map((n, index) => {
    const day = index + 1;
    return { year: nextMonthYear, month: nextMonth, day };
  });

  // Combines all dates from previous, current and next months
  return [...prevMonthDates, ...thisMonthDates, ...nextMonthDates];
};

/**
 * Returns date bounded to optional min or max
 *
 * @param {DateTime} date - the date to bound
 * @param {DateTime} minDate - minimum date
 * @param {DateTime} maxDate - maximum date
 *
 * @returns {DateTime}
 */
export const minMaxDate = (date, minDate, maxDate) => {
  const minBoundedDate = minDate ? DateTime.max(minDate, date) : date;
  const boundedDate = maxDate ? DateTime.min(maxDate, minBoundedDate) : minBoundedDate;

  return boundedDate;
};
