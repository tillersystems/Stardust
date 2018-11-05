import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import { Value } from '../..';

storiesOf('Value', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const Positive = boolean('Positive', true, 'State');
    const Negative = boolean('Negative', false, 'State');
    return (
      <Value positive={Positive} negative={Negative}>
        +10
      </Value>
    );
  });
