import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
// import { State, Store } from '@sambego/storybook-state';
import { NumberInput } from '../..';
// import { Data as IconNames } from '../../../Icon/data';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

const getCommonKnobs = () => {
  return {
    // - - - Appearance knobs - - -

    validateValue: boolean('Validate', true, 'Appearance'),

    // - - - Value knobs - - -

    hasMinValue: boolean('Has minimum', false, 'Value'),
    minValue: number(
      'Minimum value',
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'Value',
    ),
    hasMaxValue: boolean('Has maximum', false, 'Value'),
    maxValue: number(
      'Maximum value',
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'Value',
    ),
    stepValue: number(
      'Step',
      1,
      {
        range: true,
        min: 0.1,
        max: 2.0,
        step: 0.1,
      },
      'Value',
    ),

    // - - - Format knobs - - -

    decimalsValue: number(
      'Decimals',
      2,
      {
        range: true,
        min: 0,
        max: 4,
        step: 1,
      },
      'Format',
    ),
    defaultSeparatorValue: boolean('Use default separator', true, 'Format'),
    separatorValue: text('Separator', ',', 'Format'),
  };
};

storiesOf('Input - NumberInput', module)
  .addDecorator(withKnobs)

  .add('default', () => {
    const {
      validateValue,
      hasMinValue,
      minValue,
      hasMaxValue,
      maxValue,
      stepValue,
      decimalsValue,
      defaultSeparatorValue,
      separatorValue,
    } = getCommonKnobs();

    return (
      <NumberInput
        validate={validateValue}
        min={hasMinValue ? minValue : undefined}
        max={hasMaxValue ? maxValue : undefined}
        step={stepValue}
        decimals={decimalsValue}
        separator={defaultSeparatorValue ? undefined : separatorValue || '.'}
        onChange={value => onChangeAction(value)}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
      />
    );
  })

  .add('controlled', () => {
    const {
      validateValue,
      hasMinValue,
      minValue,
      hasMaxValue,
      maxValue,
      stepValue,
      decimalsValue,
      defaultSeparatorValue,
      separatorValue,
    } = getCommonKnobs();

    const valueValue = number(
      'Value',
      10,
      {
        range: true,
        min: 0,
        max: 100,
        step: 0.5,
      },
      'Value',
    );

    return (
      <NumberInput
        validate={validateValue}
        value={valueValue}
        min={hasMinValue ? minValue : undefined}
        max={hasMaxValue ? maxValue : undefined}
        step={stepValue}
        decimals={decimalsValue}
        separator={defaultSeparatorValue ? undefined : separatorValue || '.'}
        onChange={value => onChangeAction(value)}
        onFocus={onFocusAction}
        onBlur={onBlurAction}
      />
    );
  });
