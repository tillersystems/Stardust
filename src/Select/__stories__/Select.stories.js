import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { Select, Icon, Theme, Form } from '../..';

const onClickAction = action('onClick');

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const defaultValue = 'menu';
    const titleValue = text('Title', defaultValue, 'state');
    return (
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field label={titleValue}>
            <Select
              placeholder="Choose your menu"
              onClick={state => {
                onClickAction(state);
              }}
            >
              <option value="home">Home</option>
              <option value="calendar">Calendar</option>
              <option value="settings">Settings</option>
              <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
                User
              </option>
            </Select>
          </Form.Field>
        </Form.Group>
      </Form>
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
      <Form onSubmit={() => {}} name="form">
        <Form.Group>
          <Form.Field label={titleValue}>
            <Select show={showValue} selectedValue={selectedValue}>
              <option value="home">Home</option>
              <option value="calendar">Calendar</option>
              <option value="settings">Settings</option>
              <option aside={<Icon color={Theme.palette.spaceGrey} name="home" />} value="user">
                User
              </option>
            </Select>
          </Form.Field>
        </Form.Group>
      </Form>
    );
  });
