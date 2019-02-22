import React from 'react';
import * as Luxon from 'luxon';
import { fireEvent, wait, cleanup } from 'react-testing-library';

import DatePickerInput from '..';

describe('<DatePickerInput />', () => {
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

  afterEach(cleanup);

  test('should render without a problem', () => {
    const { container } = render(<DatePickerInput />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('should select the provided date value', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={mockLocalDateTime} />);

    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);

    await wait();
    const selectedDay = getByText('15');

    expect(selectedDay).toHaveStyleRule('border-top-left-radius', '0.4rem');
    expect(selectedDay).toHaveStyleRule('border-top-right-radius', '0.4rem');
  });

  test('should update the selected day in date picker according to input value', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={mockLocalDateTime} />);
    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);
    await wait();

    const selectedDay = getByText('15');
    expect(selectedDay).toHaveStyleRule('border-top-left-radius', '0.4rem');

    const inputValue = '10/01/2018';
    fireEvent.change(inputNode, { target: { value: inputValue } });

    const newSelectedDay = getByText('10');
    expect(selectedDay).not.toHaveStyleRule('border-top-left-radius', '0.4rem');
    expect(newSelectedDay).toHaveStyleRule('border-top-left-radius', '0.4rem');
  });

  test('should update the input value according to selected date in date picker', async () => {
    const { getByTestId, getByText } = render(<DatePickerInput value={mockLocalDateTime} />);
    const inputNode = getByTestId('input');
    fireEvent.focus(inputNode);
    await wait();

    const selectedDay = getByText('15');
    expect(selectedDay).toHaveStyleRule('border-top-left-radius', '0.4rem');

    const newSelectedDay = getByText('21');
    fireEvent.click(newSelectedDay);
    await wait(() => expect(newSelectedDay).not.toBeInTheDocument());

    expect(inputNode.value).toEqual('7/21/2018');
  });

  test('should display input with error when input value is invalid', async () => {
    const { getByTestId, queryByTestId } = render(<DatePickerInput value={mockLocalDateTime} />);
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
      value: mockLocalDateTime,
      minDate: Luxon.DateTime.fromObject({
        year: 2018,
        month: 8,
        day: 20,
        zone: 'Europe/Paris',
      }),
      maxDate: Luxon.DateTime.fromObject({
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
