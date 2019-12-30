/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import styled from 'styled-components';

import { Icon, ScrollBox, Select, Theme, OptionsList } from '../..';
import SelectReadme from '../README.md';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: SelectReadme,
    },
  })
  .add('uncontrolled state', () => {
    const onToggle = action('onToggle');
    const onChange = action('onChange');
    const placeholder = text('Placeholder', 'Choose your menu', 'State');
    const allowMultiple = boolean('Multiple Select', false, 'State');
    const disabled = boolean('Disabled', false, 'State');
    const usePortal = boolean('usePortal', false, 'State');
    const widthValue = number(
      'Width',
      200,
      {
        range: true,
        min: 0,
        max: 500,
        step: 100,
      },
      'State',
    );
    const containerMaxHeight = number(
      'Max Height of Dropdown',
      0,
      {
        range: true,
        min: 0,
        max: 500,
        step: 100,
      },
      'State',
    );

    return (
      <ScrollBox>
        <Select
          allowMultiple={allowMultiple}
          css={widthValue ? `width: ${widthValue.toString()}px;` : null}
          disabled={disabled}
          modifiers={{
            preventOverflow: {
              escapeWithReference: true,
            },
          }}
          contentWrapperStyle={
            containerMaxHeight
              ? {
                  maxHeight: `${containerMaxHeight.toString()}px`,
                }
              : null
          }
          placeholder={placeholder}
          onChange={onChange}
          onToggle={onToggle}
          usePortal={usePortal}
        >
          <Select.Option value="home">Home</Select.Option>
          <Select.Option value="calendar">Calendar</Select.Option>
          <Select.Option value="settings">Settings</Select.Option>
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="option1">Option 1</Select.Option>
          <Select.Option value="option2">Option 2</Select.Option>
          <Select.Option value="option3">Option 3</Select.Option>
          <Select.Option value="option4">Option 4</Select.Option>
          <Select.Option value="option5">Option 5</Select.Option>
          <Select.Option value="option6">Option 6</Select.Option>
          <Select.Option value="longStory">Very Long Option To Select</Select.Option>
        </Select>
      </ScrollBox>
    );
  })
  .add('controlled state', () => {
    const store = new Store({
      value: 'settings',
    });

    const onToggle = action('onToggle');
    const onChangeAction = action('onChange');
    const disabled = boolean('Disabled', false, 'Props');

    const StyledIcon = styled(Icon)`
      flex-shrink: 0;
      vertical-align: middle;
      margin: auto 0.5rem auto 0;
    `;

    return (
      <ScrollBox>
        <State store={store}>
          {state => (
            <Select
              placeholder="Select an option"
              onToggle={onToggle}
              onChange={value => {
                onChangeAction(value);
                store.set({ value });
              }}
              disabled={disabled}
              value={state.value}
            >
              <Select.Option value="home">
                <StyledIcon
                  name="home"
                  width="1.5rem"
                  height="1.5rem"
                  color={Theme.palette.darkBlue}
                />
                <span>Home</span>
              </Select.Option>
              <Select.Option value="calendar">Calendar</Select.Option>
              <Select.Option value="settings">Settings</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          )}
        </State>
      </ScrollBox>
    );
  })
  .add('with custom displayed value', () => {
    const store = new Store({
      values: ['settings'],
    });

    const onToggle = action('onToggle');
    const onChangeAction = action('onChange');

    const HeaderComponent = ({ values, ...rest }) => (
      <Select.Header
        displayValue={values.length > 1 ? `${values.length} selected` : null}
        values={values}
        {...rest}
      />
    );

    const searchMethod = ({ options, term }) => {
      return options.filter(option => option.label.toLowerCase().includes(term.toLowerCase()));
    };

    return (
      <ScrollBox>
        <State store={store}>
          {state => (
            <Select
              css="width: 240px"
              allowMultiple
              searchMethod={searchMethod}
              searchPlaceholder="Search an item..."
              OptionComponent={OptionsList.CheckboxOption}
              NoResult="No result"
              onToggle={onToggle}
              onChange={values => {
                onChangeAction(values);
                store.set({ values });
              }}
              HeaderComponent={HeaderComponent}
              values={state.values}
              placeholder="Select some values"
            >
              <Select.Option value="home">Home</Select.Option>
              <Select.Option value="calendar">Calendar</Select.Option>
              <Select.Option value="settings">Settings</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          )}
        </State>
      </ScrollBox>
    );
  });
