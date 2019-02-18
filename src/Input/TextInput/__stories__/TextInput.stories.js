import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { TextInput } from '../..';
import { Data as IconNames } from '../../../Icon/data';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

const storeWithState = new Store({
  value: '',
});

storiesOf('Input - TextInput', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const widthValue = number(
      'Width',
      25,
      {
        range: true,
        min: 20,
        max: 50,
        step: 1,
      },
      'Size',
    );
    const fluidValue = boolean('Fluid', false, 'Size');

    const disabledValue = boolean('Disabled', false, 'General');

    const loadingValue = boolean('Loading', false, 'Status');
    const ghostValue = boolean('Ghost', false, 'Status');
    const infoValue = boolean('Info', false, 'Status');
    const successValue = boolean('Success', false, 'Status');
    const warningValue = boolean('Warning', false, 'Status');
    const errorValue = boolean('Error', false, 'Status');
    const searchValue = boolean('Search', false, 'Status');

    return (
      <TextInput
        width={`${widthValue}rem`}
        fluid={fluidValue}
        placeholder="Write some stuff"
        disabled={disabledValue}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
        loading={loadingValue}
        info={infoValue}
        ghost={ghostValue}
        success={successValue}
        warning={warningValue}
        error={errorValue}
        search={searchValue}
      />
    );
  })

  .add('controlled', () => {
    const disabledValue = boolean('Disabled', false, 'General');
    const valueValue = text('Value', '', 'General');

    return (
      <TextInput
        value={valueValue}
        onChange={onChangeAction}
        placeholder="Write some stuff"
        disabled={disabledValue}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
      />
    );
  })

  .add('controlled with state', () => {
    const disabledValue = boolean('Disabled', false, 'General');

    return (
      <State store={storeWithState}>
        <TextInput
          type="text"
          value={storeWithState.get('value')}
          onChange={value => {
            storeWithState.set({ value });
            onChangeAction(value);
          }}
          placeholder="Write some stuff"
          disabled={disabledValue}
          onFocus={onFocusAction}
          onBlur={onBlurAction}
        />
      </State>
    );
  })

  .add('with text label', () => {
    const disabledValue = boolean('Disabled', false, 'General');

    const labelValue = text('Label text', 'http://', 'Label');
    const labelPositionValue = select('Label position', ['left', 'right'], 'left', 'Label');

    return (
      <TextInput
        placeholder="Write some stuff"
        disabled={disabledValue}
        label={{ text: labelValue }}
        labelPosition={labelPositionValue}
      />
    );
  })

  .add('with icon label', () => {
    const disabledValue = boolean('Disabled', false, 'General');

    const labelValue = select('Label icon', Object.keys(IconNames), 'euro', 'Label');
    const labelPositionValue = select('Label position', ['left', 'right'], 'right', 'Label');

    return (
      <TextInput
        placeholder="Write some stuff"
        disabled={disabledValue}
        label={{ icon: labelValue }}
        labelPosition={labelPositionValue}
      />
    );
  });
