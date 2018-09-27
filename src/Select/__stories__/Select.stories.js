import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';

import { Select, Icon, Theme } from '../..';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const defaultValue = 'menu';
    const titleValue = text('Title', defaultValue, 'state');
    return (
      <Select title={titleValue}>
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
    const defaultValue = 'menu';
    const titleValue = text('Title', defaultValue, 'state');
    const options = {
      home: 'home',
      calendar: 'calendar',
      settings: 'settings',
      user: 'user',
    };
    const selectedValue = select('Selected value', options, 'user', 'state');
    const showValue = boolean('Show', false, 'state');
    return (
      <Select title={titleValue} show={showValue} selectedValue={selectedValue}>
        <option value="home">Home</option>
        <option value="calendar">Calendar</option>
        <option value="settings">Settings</option>
        <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
          User
        </option>
      </Select>
    );
  });
