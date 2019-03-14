import React from 'react';
import { DateTime, Settings } from 'luxon';
import { fireEvent, wait } from 'react-testing-library';
import Mockdate from 'mockdate';

import DatePickerInput from '..';
import Theme from '../../../Theme';

Settings.defaultZoneName = 'utc';

describe('<DatePickerInput />', () => {
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
    const { container } = render(<DatePickerInput />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select the provided date value', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={dateValue} />);

    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);

    await wait();
    const selectedDay = getByText('15');

    expect(selectedDay).toHaveStyleRule('color', Theme.palette.white);
    expect(selectedDay).toHaveStyleRule('background', Theme.palette.primary.default);
  });

  test('should update the selected day in date picker according to input value', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={dateValue} />);
    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);
    await wait();

    const selectedDay = getByText('15');
    expect(selectedDay).toHaveStyleRule('color', Theme.palette.white);
    expect(selectedDay).toHaveStyleRule('background', Theme.palette.primary.default);

    const inputValue = '10/01/2018';
    fireEvent.change(inputNode, { target: { value: inputValue } });

    const newSelectedDay = getByText('10');
    const previouSelectedDay = getByText('15');

    expect(previouSelectedDay).not.toHaveStyleRule('color', Theme.palette.white);
    expect(previouSelectedDay).not.toHaveStyleRule('background', Theme.palette.primary.default);
    expect(newSelectedDay).toHaveStyleRule('color', Theme.palette.white);
    expect(newSelectedDay).toHaveStyleRule('background', Theme.palette.primary.default);
  });

  test('should update the input value according to selected date in date picker', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={dateValue} />);
    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);
    await wait();

    const selectedDay = getByText('15');

    expect(selectedDay).toHaveStyleRule('color', Theme.palette.white);
    expect(selectedDay).toHaveStyleRule('background', Theme.palette.primary.default);

    const newSelectedDay = getByText('21');
    fireEvent.click(newSelectedDay);
    await wait(() => expect(newSelectedDay).not.toBeInTheDocument());

    expect(inputNode.value).toEqual('7/21/2018');
  });

  test('should display input with error when input value is invalid', async () => {
    const { getByTestId, queryByTestId } = render(<DatePickerInput value={dateValue} />);
    const inputNode = getByTestId('input');

    const statusNode = queryByTestId('status');
    expect(statusNode).not.toBeInTheDocument();

    const inputValue = '10/01/';
    fireEvent.change(inputNode, { target: { value: inputValue } });

    const errorStatusNode = getByTestId('status');
    expect(errorStatusNode).toHaveStyleRule('background', 'hsl(6,79%,65%)');
  });

  test('should display input with error when input value is out of range', async () => {
    const props = {
      value: dateValue,
      minDate: DateTime.fromObject({
        year: 2018,
        month: 8,
        day: 20,
        zone: 'Europe/Paris',
      }),
      maxDate: DateTime.fromObject({
        year: 2018,
        month: 9,
        day: 20,
        zone: 'Europe/Paris',
      }),
    };
    const { getByTestId, queryByTestId } = render(<DatePickerInput {...props} />);
    const inputNode = getByTestId('input');

    const statusNode = queryByTestId('status');
    expect(statusNode).not.toBeInTheDocument();

    const inputValue = '10/07/2018';
    fireEvent.change(inputNode, { target: { value: inputValue } });

    const errorStatusNode = getByTestId('status');
    expect(errorStatusNode).toHaveStyleRule('background', 'hsl(6,79%,65%)');
  });
});
