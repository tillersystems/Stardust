import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { Input } from '../..';
import { Data as IconNames } from '../../Icon/data';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

storiesOf('Input', module)
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

    const typeValue = select('Type', ['text', 'password', 'email'], 'text', 'General');
    const disabledValue = boolean('Disabled', false, 'General');

    const loadingValue = boolean('Loading', false, 'Status');
    const infoValue = boolean('Info', false, 'Status');
    const successValue = boolean('Success', false, 'Status');
    const warningValue = boolean('Warning', false, 'Status');
    const errorValue = boolean('Error', false, 'Status');
    const searchValue = boolean('Search', false, 'Status');

    return (
      <Input
        width={`${widthValue}rem`}
        fluid={fluidValue}
        type={typeValue}
        placeHolder="Write some stuff"
        disabled={disabledValue}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
        loading={loadingValue}
        info={infoValue}
        success={successValue}
        warning={warningValue}
        error={errorValue}
        search={searchValue}
      />
    );
  })

  .add('controlled', () => {
    const typeValue = select('Type', ['text', 'password'], 'text', 'General');
    const disabledValue = boolean('Disabled', false, 'General');
    const valueValue = text('Value', '', 'General');

    return (
      <Input
        type={typeValue}
        value={valueValue}
        onChange={onChangeAction}
        placeHolder="Write some stuff"
        disabled={disabledValue}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
      />
    );
  })

  .add('with label', () => {
    const typeValue = select('Type', ['text', 'password'], 'text', 'General');
    const disabledValue = boolean('Disabled', false, 'General');

    const labelValue = select('Label icon', Object.keys(IconNames), 'euro', 'Label');
    const labelPositionValue = select('Label position', ['left', 'right'], 'left', 'Label');

    return (
      <Input
        type={typeValue}
        placeHolder="Write some stuff"
        disabled={disabledValue}
        label={labelValue}
        labelPosition={labelPositionValue}
      />
    );
  });
