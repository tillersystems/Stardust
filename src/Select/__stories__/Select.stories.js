import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Select } from '../..';

storiesOf('Select', module)
  .addDecorator(withKnobs)
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
        <Select.Option>Home</Select.Option>
        <Select.Option>Calendar</Select.Option>
        <Select.Option>Settings</Select.Option>
        <Select.Option>User</Select.Option>
      </Select>
    );
  });
