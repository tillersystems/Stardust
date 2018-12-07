import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { Increment } from '../..';

storiesOf('Increment', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Increment initialCount={0} step={10} max={100} min={0} />;
  });
