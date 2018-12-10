import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { Counter } from '../..';

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const step = number(
      'Step',
      1,
      {
        range: true,
        min: 1,
        max: 100,
        step: 1,
      },
      'step',
    );
    const max = number(
      'Max value',
      100,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'max',
    );
    const min = number(
      'Min value',
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'min',
    );
    const appearance = select(
      'Appearance',
      {
        default: 'default',
        primary: 'primary',
        secondary: 'secondary',
        success: 'success',
        failure: 'failure',
        google: 'google',
      },
      'secondary',
      'State',
    );
    const widthValue = number(
      'Width',
      5,
      {
        range: true,
        min: 5,
        max: 50,
        step: 1,
      },
      'Size',
    );

    return (
      <Counter step={step} max={max} min={min} appearance={appearance} width={`${widthValue}rem`} />
    );
  });
