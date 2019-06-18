import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, color } from '@storybook/addon-knobs';

import { Loader } from '../..';
import Theme from '../../Theme';
import LoaderReadme from '../README.md';

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: LoaderReadme,
    },
  })
  .add('Default', () => {
    const widthValue = number(
      'Width',
      2,
      {
        range: true,
        min: 2,
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
        min: 2,
        max: 10,
        step: 1,
      },
      'Size',
    );
    const ColorValue = color('Color', Theme.palette.primary.default, 'Color');

    return <Loader color={ColorValue} width={`${widthValue}rem`} height={`${heightValue}rem`} />;
  });
