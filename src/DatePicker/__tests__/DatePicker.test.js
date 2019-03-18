import React from 'react';
import { DateTime, Settings } from 'luxon';
import Mockdate from 'mockdate';
import { fireEvent } from 'react-testing-library';

import DatePicker from '..';
import Theme from '../../Theme';

Settings.defaultZoneName = 'utc';

describe('<DatePicker />', () => {
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

  describe('Simple', () => {
    test('should render without a problem', () => {
      const { container } = render(<DatePicker />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('should have days after max date disabled', () => {
      const maxDate = DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 17,
        hour: 0,
        minute: 0,
        second: 0,
      });
      const { getByText } = render(<DatePicker defaultValue={dateValue} maxDate={maxDate} />);

      const disabledDay = getByText('18');

      expect(disabledDay).toHaveStyleRule('cursor', 'not-allowed');
      expect(disabledDay).toHaveStyleRule('color', Theme.palette.lightGrey);
    });

    test('should not select a date after the max date', () => {
      const maxDate = DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 17,
        hour: 0,
        minute: 0,
        second: 0,
      });
      const { getByText } = render(<DatePicker defaultValue={dateValue} maxDate={maxDate} />);

      const disabledDay = getByText('19');

      // Click on disabled day
      fireEvent.click(disabledDay);

      expect(disabledDay).toHaveStyleRule('cursor', 'not-allowed');
      expect(disabledDay).toHaveStyleRule('color', Theme.palette.lightGrey);
    });

    test('should have days before min date disabled', () => {
      const minDate = DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 17,
        hour: 0,
        minute: 0,
        second: 0,
      });
      const { getByText } = render(<DatePicker defaultValue={dateValue} minDate={minDate} />);

      const disabledDay = getByText('15');

      expect(disabledDay).toHaveStyleRule('cursor', 'not-allowed');
      expect(disabledDay).toHaveStyleRule('color', Theme.palette.lightGrey);
    });

    test('should not select a date before the min date', () => {
      const minDate = DateTime.fromObject({
        year: 2018,
        month: 7,
        day: 17,
        hour: 0,
        minute: 0,
        second: 0,
      });
      const { getByText } = render(<DatePicker defaultValue={dateValue} minDate={minDate} />);

      const disabledDay = getByText('14');

      // Click on disabled day
      fireEvent.click(disabledDay);

      expect(disabledDay).toHaveStyleRule('cursor', 'not-allowed');
      expect(disabledDay).toHaveStyleRule('color', Theme.palette.lightGrey);
    });

    test('should display 2 consecutives months', () => {
      const { getByText } = render(
        <DatePicker defaultValue={dateValue} numberOfMonthsToDisplay={2} />,
      );

      const excpectedFirstMonth = getByText(/July/);
      const excpectedSecondMonth = getByText(/August/);

      expect(excpectedFirstMonth).toBeInTheDocument();
      expect(excpectedSecondMonth).toBeInTheDocument();
    });

    test('should select a date', () => {
      const { getByText } = render(<DatePicker defaultValue={dateValue} />);

      const daySelected = getByText('20');

      // Click on day
      fireEvent.click(daySelected);

      expect(daySelected).toBeInTheDocument();
      expect(daySelected).toHaveStyleRule('color', Theme.palette.white);
      expect(daySelected).toHaveStyleRule('background', Theme.palette.primary.default);
    });

    test('should go to the next month if a shadowed day is selected', () => {
      const { getByText, getAllByText } = render(<DatePicker defaultValue={dateValue} />);

      let monthNode = getByText(/July/);

      const daySelected = getAllByText('1')[1];

      // Click on day
      fireEvent.click(daySelected);

      monthNode = getByText(/August/);

      expect(monthNode).toBeInTheDocument();
    });

    test('should call onDateChanged when a date is selected', () => {
      const spy = jest.fn();
      const { getByText } = render(<DatePicker defaultValue={dateValue} onDateChanged={spy} />);

      const daySelected = getByText('14');

      // Click on previous month button
      fireEvent.click(daySelected);

      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('should handle previous month', () => {
      const { getByTestId, getByText } = render(<DatePicker defaultValue={dateValue} />);

      const previousMonthButton = getByTestId('previous-month-button');

      // Click on previous month button
      fireEvent.click(previousMonthButton);

      const excpectedMonth = getByText(/June/);

      expect(excpectedMonth).toBeInTheDocument();
    });

    test('should handle next month', () => {
      const { getByTestId, getByText } = render(<DatePicker defaultValue={dateValue} />);

      const nextMonthButton = getByTestId('next-month-button');

      // Click on previous month button
      fireEvent.click(nextMonthButton);

      const excpectedMonth = getByText(/August/);

      expect(excpectedMonth).toBeInTheDocument();
    });
  });

  describe('Range', () => {
    test('should render without a problem', () => {
      const { container } = render(<DatePicker rangePicker />);

      expect(container.firstChild).toMatchSnapshot();
    });

    test('should select a date range', () => {
      const { getByText } = render(<DatePicker defaultValue={dateValue} rangePicker />);

      let firstDayNode = getByText('14');

      // Click on a day
      fireEvent.click(firstDayNode);

      let lastDayNode = getByText('16');

      // Click on a day
      fireEvent.click(lastDayNode);

      firstDayNode = getByText('14');
      lastDayNode = getByText('16');

      expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

      expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

      firstDayNode = getByText('18');

      // Click on a day
      fireEvent.click(firstDayNode);

      lastDayNode = getByText('20');

      // Click on a day
      fireEvent.click(lastDayNode);

      firstDayNode = getByText('18');
      lastDayNode = getByText('20');

      expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

      expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
    });

    test('should select a date range where the first date is after the second', () => {
      const { getByText } = render(<DatePicker defaultValue={dateValue} rangePicker />);

      let firstDayNode = getByText('14');

      // Click on a day
      fireEvent.click(firstDayNode);

      let lastDayNode = getByText('12');

      // Click on a day
      fireEvent.click(lastDayNode);

      firstDayNode = getByText('14');
      lastDayNode = getByText('12');

      expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

      expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
      expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
    });

    test('should handle previous month', () => {
      const { getByTestId, getByText } = render(
        <DatePicker defaultValue={dateValue} rangePicker />,
      );

      const previousMonthButton = getByTestId('previous-month-button');

      // Click on previous month button
      fireEvent.click(previousMonthButton);

      const excpectedMonth = getByText(/June/);

      expect(excpectedMonth).toBeInTheDocument();
    });

    test('should handle next month', () => {
      const { getByTestId, getByText } = render(
        <DatePicker defaultValue={dateValue} rangePicker />,
      );

      const nextMonthButton = getByTestId('next-month-button');

      // Click on previous month button
      fireEvent.click(nextMonthButton);

      const excpectedMonth = getByText(/August/);

      expect(excpectedMonth).toBeInTheDocument();
    });

    describe('with 2 consecutives months displayed', () => {
      test('should render without a problem', () => {
        const { getByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        let firstDayNode = getByText('14');

        // Click on a day
        fireEvent.click(firstDayNode);

        let lastDayNode = getByText('16');

        // Click on a day
        fireEvent.click(lastDayNode);

        firstDayNode = getByText('14');
        lastDayNode = getByText('16');

        expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

        expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
      });

      test('should select a date range', () => {
        const { getAllByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        let firstDayNode = getAllByText('18')[0];

        // Click on a day
        fireEvent.click(firstDayNode);

        let lastDayNode = getAllByText('1')[1];

        // Click on a day
        fireEvent.click(lastDayNode);

        firstDayNode = getAllByText('18')[0];
        lastDayNode = getAllByText('1')[2];

        expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

        expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

        firstDayNode = getAllByText('18')[0];

        // Click on a day
        fireEvent.click(firstDayNode);

        lastDayNode = getAllByText('18')[1];

        // Click on a day
        fireEvent.click(lastDayNode);

        firstDayNode = getAllByText('18')[0];
        lastDayNode = getAllByText('18')[1];

        expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

        expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
      });

      test('should go to the next month if a shadowed day is selected in the second calendar', () => {
        const { getByText, getAllByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        const monthNodes = [getByText(/July/), getByText(/August/)];

        expect(monthNodes[0]).toBeInTheDocument();
        expect(monthNodes[1]).toBeInTheDocument();

        const daySelected = getAllByText('1')[3];

        // Click on day
        fireEvent.click(daySelected);

        const NextMonthNodes = [getByText(/September/), getByText(/October/)];

        expect(NextMonthNodes[0]).toBeInTheDocument();
        expect(NextMonthNodes[1]).toBeInTheDocument();
      });

      test('should select a date range where the first date is after the second', () => {
        const { getAllByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        let firstDayNode = getAllByText('18')[1];

        // Click on a day
        fireEvent.click(firstDayNode);

        let lastDayNode = getAllByText('18')[0];

        // Click on a day
        fireEvent.click(lastDayNode);

        firstDayNode = getAllByText('18')[1];
        lastDayNode = getAllByText('18')[0];

        expect(firstDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(firstDayNode).toHaveStyleRule('background', Theme.palette.primary.default);

        expect(lastDayNode).toHaveStyleRule('color', Theme.palette.white);
        expect(lastDayNode).toHaveStyleRule('background', Theme.palette.primary.default);
      });

      test('should handle previous month', () => {
        const { getByTestId, getByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        const previousMonthButton = getByTestId('previous-month-button');

        // Click on previous month button
        fireEvent.click(previousMonthButton);

        const excpectedMonth = [getByText(/June/), getByText(/July/)];

        expect(excpectedMonth[0]).toBeInTheDocument();
        expect(excpectedMonth[1]).toBeInTheDocument();
      });

      test('should handle next month', () => {
        const { getByTestId, getByText } = render(
          <DatePicker defaultValue={dateValue} rangePicker numberOfMonthsToDisplay={2} />,
        );

        const nextMonthButton = getByTestId('next-month-button');

        // Click on previous month button
        fireEvent.click(nextMonthButton);

        const excpectedMonth = [getByText(/August/), getByText(/September/)];

        expect(excpectedMonth[0]).toBeInTheDocument();
        expect(excpectedMonth[1]).toBeInTheDocument();
      });
    });
  });
});
