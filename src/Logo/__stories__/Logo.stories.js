import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, color, number } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
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
  .add('with customizable properties', () => {
    const colorValue = color('Color', '#12475f', 'Props');

    const widthValue = number(
      'Width',
      300,
      {
        range: true,
        min: 1,
        max: 600,
        step: 20,
      },
      'Props',
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
      'Props',
    );

    return (
      <Wrapper>
        <Logo color={colorValue} width={widthValue.toString()} height={heightValue.toString()} />
      </Wrapper>
    );
  });
