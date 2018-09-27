import React from 'react';
import 'jest-styled-components';

import Select from '..';
import { Icon } from '../..';
import Theme from '../../Theme';

describe('<Select />', () => {
  it('should render without a problem', () => {
    const render = shallowWithTheme(
      <Select title="menu">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>,
    );

    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when dropdown is open', () => {
    const render = mountWithTheme(
      <Select id="select" title="menu">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>,
    );
    render.find('#select div[onClick]').simulate('click');
    expect(render).toMatchSnapshot();
  });

  it('should render without a problem when settings is preselected and dropdown is showed', () => {
    const render = shallowWithTheme(
      <Select id="select" title="menu" show selectedValue="settings">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>,
    );
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when props is set', () => {
    const render = shallowWithTheme(
      <Select id="select" title="menu" show={false} selectedValue="settings">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>,
    );

    render.setProps({ selectedValue: 'calendar' });
    render.setProps({ show: true });
    expect(render.dive()).toMatchSnapshot();
  });

  it('should render without a problem when props selectedValue is unset', () => {
    const render = shallowWithTheme(
      <Select id="select" title="menu" selectedValue="settings">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>,
    );

    render.setProps({ selectedValue: null });
    expect(render.dive()).toMatchSnapshot();
  });
});
