import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import Variation from '..';

storiesOf('Variation', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const Negative = boolean('Negative', false, 'State');
    return <Variation negative={Negative} />;
  });
