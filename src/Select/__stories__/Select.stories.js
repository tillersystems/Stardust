import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/react';

import { Select, Icon, Theme } from '../..';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Select title="menu">
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>
    );
  })
  .add('controlled', () => {
    const options = {
      home: 'home',
      calendar: 'calendar',
      settings: 'settings',
      user: 'user',
    };
    const selectedValue = select('Selected value', options, 'user', 'state');
    const showValue = boolean('Show', false, 'state');
    return (
      <Select title="menu" show={showValue} selectedValue={selectedValue}>
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>
    );
  });
