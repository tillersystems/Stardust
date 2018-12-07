import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Increment } from '../..';

storiesOf('Increment', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Increment />;
  });
