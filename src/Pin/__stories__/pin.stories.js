import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';

import Theme from '../../Theme';
import Pin from '..';
import PinReadme from '../README.md';

storiesOf('Pin', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: PinReadme,
    },
  })
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
