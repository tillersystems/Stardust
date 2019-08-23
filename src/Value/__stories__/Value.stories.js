import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
import { Value } from '../..';
import ValueReadme from '../README.md';

storiesOf('Value', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ValueReadme,
    },
  })
  .add('default', () => {
    const Positive = boolean('Positive', true, 'State');
    const Negative = boolean('Negative', false, 'State');
    return (
      <Wrapper>
        <Value positive={Positive} negative={Negative}>
          +10
        </Value>
      </Wrapper>
    );
  });
