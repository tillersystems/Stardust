import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';

import { Icon, Select, Theme } from '../..';
import SelectReadme from '../README.md';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: SelectReadme,
    },
  })
  .add('default', () => {
    const placeholder = text('Placeholder', 'Choose your menu', 'State');
    const onToggle = action('onToggle');
    const onChange = action('onChange');
    const disabled = boolean('Disabled', false, 'State');
    const resetValue = boolean('Reset value', false, 'State');

    return (
      <Select
        placeholder={placeholder}
        onToggle={onToggle}
        onChange={onChange}
        disabled={disabled}
        resetValue={resetValue}
      >
        <Select.Option value="home">Home</Select.Option>
        <Select.Option value="calendar">Calendar</Select.Option>
        <Select.Option value="settings">Settings</Select.Option>
        <Select.Option value="user">User</Select.Option>
      </Select>
    );
  })
  .add('without placeholder', () => {
    const onToggle = action('onToggle');
    const onChange = action('onChange');
    const disabled = boolean('Disabled', false, 'State');
    const resetValue = boolean('Reset value', false, 'State');

    const StyledIcon = styled(Icon)`
      vertical-align: middle;
      margin: auto 0.5rem auto auto;
    `;

    return (
      <Select onToggle={onToggle} onChange={onChange} disabled={disabled} resetValue={resetValue}>
        <Select.Option value="home">
          <StyledIcon name="home" width="1.5rem" height="1.5rem" color={Theme.palette.darkBlue} />
          <div>Home</div>
        </Select.Option>
        <Select.Option value="calendar">Calendar</Select.Option>
        <Select.Option value="settings">Settings</Select.Option>
        <Select.Option value="user">User</Select.Option>
      </Select>
    );
  })
  .add('with width', () => {
    const onToggle = action('onToggle');
    const onChange = action('onChange');
    const disabled = boolean('Disabled', false, 'State');
    const resetValue = boolean('Reset value', false, 'State');
    const widthValue = number(
      'Width',
      200,
      {
        range: true,
        min: 100,
        max: 500,
        step: 10,
      },
      'State',
    );

    return (
      <Select
        onToggle={onToggle}
        onChange={onChange}
        disabled={disabled}
        resetValue={resetValue}
        width={`${widthValue.toString()}px`}
      >
        <Select.Option value="home">Home</Select.Option>
        <Select.Option value="calendar">Calendar</Select.Option>
        <Select.Option value="settings">Settings</Select.Option>
        <Select.Option value="user">User</Select.Option>
      </Select>
    );
  })
  .add('with default value', () => {
    const onToggle = action('onToggle');
    const onChange = action('onChange');
    const disabled = boolean('Disabled', false, 'Props');
    const resetValue = boolean('Reset value', false, 'Props');
    const value = select(
      'Value',
      {
        home: 'home',
        calendar: 'calendar',
        settings: 'settings',
        user: 'user',
      },
      'home',
      'Props',
    );

    const StyledIcon = styled(Icon)`
      vertical-align: middle;
      margin: auto 0.5rem auto auto;
    `;

    return (
      <Select
        onToggle={onToggle}
        onChange={onChange}
        disabled={disabled}
        resetValue={resetValue}
        value={value}
      >
        <Select.Option value="home">
          <StyledIcon name="home" width="1.5rem" height="1.5rem" color={Theme.palette.darkBlue} />
          <div>Home</div>
        </Select.Option>
        <Select.Option value="calendar">Calendar</Select.Option>
        <Select.Option value="settings">Settings</Select.Option>
        <Select.Option value="user">User</Select.Option>
      </Select>
    );
  });
