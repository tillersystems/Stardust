import React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import 'jest-styled-components';
import * as Luxon from 'luxon';

import DateRangePicker from '..';
import Theme from '../../../Theme';

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

  it('should render withouth a problem', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <DateRangePicker minDate={mockLocalDateTime} />
      </ThemeProvider>,
    );
    expect(render).toMatchSnapshot();
  });

  it('should handle previous month', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <DateRangePicker />
      </ThemeProvider>,
    );

    render
      .find('button')
      .first()
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should handle next month', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <DateRangePicker />
      </ThemeProvider>,
    );

    render
      .find('button')
      .first()
      .simulate('click');

    expect(render).toMatchSnapshot();

    render
      .find('button')
      .last()
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should handle date selection', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <DateRangePicker />
      </ThemeProvider>,
    );

    render
      .find('Day')
      .at(17)
      .simulate('click');

    expect(render).toMatchSnapshot();

    render
      .find('Day')
      .at(53)
      .simulate('click');

    expect(render).toMatchSnapshot();

    render
      .find('Day')
      .at(15)
      .simulate('click');

    expect(render).toMatchSnapshot();
  });

  it('should handle date hover', () => {
    const render = mount(
      <ThemeProvider theme={Theme}>
        <DateRangePicker />
      </ThemeProvider>,
    );

    render
      .find('Day')
      .at(17)
      .simulate('mouseover');

    expect(render).toMatchSnapshot();

    render
      .find('Day')
      .at(17)
      .simulate('click');

    expect(render).toMatchSnapshot();

    render
      .find('Day')
      .at(53)
      .simulate('mouseover');

    expect(render).toMatchSnapshot();
  });
});
