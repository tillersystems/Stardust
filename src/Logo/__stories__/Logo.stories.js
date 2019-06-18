import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';

import { Logo } from '../..';
import LogoReadme from '../README.md';

storiesOf('Logo', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: LogoReadme,
    },
  })
  .add('default', () => (
    <div
      style={{
        background: 'hsl(213, 17%, 20%)',
        height: '10rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Logo />
    </div>
  ))
  .add('with properties', () => {
    const colorValue = color('Color', '#12475f', 'Color');

    const widthValue = number(
      'Width',
      300,
      {
        range: true,
        min: 1,
        max: 600,
        step: 20,
      },
      'Sizes',
    );
    const heightValue = number(
      'Height',
      80,
      {
        range: true,
        min: 1,
        max: 600,
        step: 20,
      },
      'Sizes',
    );

    return (
      <Logo color={colorValue} width={widthValue.toString()} height={heightValue.toString()} />
    );
  });
