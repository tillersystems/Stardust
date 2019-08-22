import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Variation from '..';
import Wrapper from '../../Wrapper';
import VariationReadme from '../README.md';

storiesOf('Variation', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: VariationReadme,
    },
  })
  .add('default', () => {
    const Negative = boolean('Negative', false, 'State');
    return (
      <Wrapper>
        <Variation negative={Negative} />
      </Wrapper>
    );
  });
