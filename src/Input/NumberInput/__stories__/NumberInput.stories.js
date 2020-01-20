import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, text, select, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import Wrapper from '../../../Wrapper';
import { NumberInput } from '../..';
import { Data as IconNames } from '../../../Icon/data';
import NumberInputReadme from '../README.md';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

const getCommonKnobs = () => {
  return {
    // - - - Size knobs - - -
    widthValue: number(
      'Width',
      25,
      {
        range: true,
        min: 20,
        max: 50,
        step: 1,
      },
      'Size',
    ),
    fluidValue: boolean('Fluid', false, 'Size'),

    // - - - Appearance knobs - - -
    infoValue: boolean('Info', false, 'Appearance'),
    successValue: boolean('Success', false, 'Appearance'),
    warningValue: boolean('Warning', false, 'Appearance'),
    errorValue: boolean('Error', false, 'Appearance'),
    validateValue: boolean('Validate', false, 'Appearance'),

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
  .addParameters({
    readme: {
      // Show readme before story
      content: NumberInputReadme,
    },
  })
  .add('default', () => {
    const {
      widthValue,
      fluidValue,
      infoValue,
      successValue,
      warningValue,
      errorValue,
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
      <Wrapper>
        <NumberInput
          placeholder="0"
          width={`${widthValue}rem`}
          fluid={fluidValue}
          info={infoValue}
          success={successValue}
          warning={warningValue}
          error={errorValue}
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
      </Wrapper>
    );
  })

  .add('controlled', () => {
    const {
      widthValue,
      fluidValue,
      infoValue,
      successValue,
      warningValue,
      errorValue,
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
        min: -10,
        max: 100,
        step: 0.5,
      },
      'Value',
    );

    return (
      <Wrapper>
        <NumberInput
          placeholder="type a number"
          width={`${widthValue}rem`}
          fluid={fluidValue}
          info={infoValue}
          success={successValue}
          warning={warningValue}
          error={errorValue}
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
      </Wrapper>
    );
  })

  .add('with text label', () => {
    const {
      widthValue,
      fluidValue,
      infoValue,
      successValue,
      warningValue,
      errorValue,
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

    const labelValue = text('Label text', 'Amount:', 'Label');
    const labelPositionValue = select('Label position', ['left', 'right'], 'left', 'Label');

    return (
      <Wrapper>
        <NumberInput
          placeholder="0"
          width={`${widthValue}rem`}
          fluid={fluidValue}
          info={infoValue}
          success={successValue}
          warning={warningValue}
          error={errorValue}
          validate={validateValue}
          min={hasMinValue ? minValue : undefined}
          max={hasMaxValue ? maxValue : undefined}
          step={stepValue}
          decimals={decimalsValue}
          separator={defaultSeparatorValue ? undefined : separatorValue || '.'}
          onChange={value => onChangeAction(value)}
          onFocus={onFocusAction}
          onBlur={onBlurAction}
          label={{ text: labelValue }}
          labelPosition={labelPositionValue}
        />
      </Wrapper>
    );
  })

  .add('with icon label', () => {
    const {
      widthValue,
      fluidValue,
      infoValue,
      successValue,
      warningValue,
      errorValue,
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

    const labelValue = select('Label icon', Object.keys(IconNames), 'euro', 'Label');
    const labelPositionValue = select('Label position', ['left', 'right'], 'right', 'Label');

    return (
      <Wrapper>
        <NumberInput
          placeholder="0"
          width={`${widthValue}rem`}
          fluid={fluidValue}
          info={infoValue}
          success={successValue}
          warning={warningValue}
          error={errorValue}
          validate={validateValue}
          min={hasMinValue ? minValue : undefined}
          max={hasMaxValue ? maxValue : undefined}
          step={stepValue}
          decimals={decimalsValue}
          separator={defaultSeparatorValue ? undefined : separatorValue || '.'}
          onChange={value => onChangeAction(value)}
          onFocus={onFocusAction}
          onBlur={onBlurAction}
          label={{ icon: labelValue }}
          labelPosition={labelPositionValue}
        />
      </Wrapper>
    );
  });
