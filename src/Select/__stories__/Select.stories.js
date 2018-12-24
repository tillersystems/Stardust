import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Select } from '../..';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const Title = text('Title', 'Choose your menu', 'State');
    const onToggle = action('onToggle');
    const onSelected = action('onSelected');
    const disabled = boolean('Disabled', false, 'State');

    return (
      <Select title={Title} onToggle={onToggle} onSelected={onSelected} disabled={disabled}>
        <Select.Option>Home</Select.Option>
        <Select.Option>Calendar</Select.Option>
        <Select.Option>Settings</Select.Option>
        <Select.Option>User</Select.Option>
      </Select>
    );
  });
