import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';

import Theme from '../../Theme';
import Pin from '..';

storiesOf('Pin', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const widthValue = number(
      'Width',
      2,
      {
        range: true,
        min: 1,
        max: 10,
        step: 1,
      },
      'Size',
    );
    const heightValue = number(
      'Height',
      2,
      {
        range: true,
        min: 1,
        max: 10,
        step: 1,
      },
      'Size',
    );
    const ColorValue = color('Color', Theme.palette.primary.default, 'Color');

    return <Pin color={ColorValue} width={`${widthValue}rem`} height={`${heightValue}rem`} />;
  });
