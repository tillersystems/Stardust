import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';
import { NumberInput } from '../..';
import { Data as IconNames } from '../../../Icon/data';

const onChangeAction = action('onChange');
const onFocusAction = action('onFocus');
const onBlurAction = action('onBlur');

storiesOf('Input - NumberInput', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    // - - - Appearance knobs - - -
    const validateValue = boolean('Validate', true, 'Appearance');

    // - - - Range knobs - - -
    const stepValue = number(
      'Step',
      1,
      {
        range: true,
        min: 0.1,
        max: 2.0,
        step: 0.1,
      },
      'Range',
    );

    // - - - Format knobs - - -
    const decimalsValue = number(
      'Decimals',
      2,
      {
        range: true,
        min: 0,
        max: 4,
        step: 1,
      },
      'Format',
    );
    const defaultSeparatorValue = boolean('Use default separator', true, 'Format');
    const separatorValue = text('Separator', ',', 'Format');

    return (
      <NumberInput
        validate={validateValue}
        min={0}
        max={15}
        step={stepValue}
        decimals={decimalsValue}
        separator={defaultSeparatorValue ? undefined : separatorValue || '.'}
        onChange={value => onChangeAction(value)}
      />
    );
  });
