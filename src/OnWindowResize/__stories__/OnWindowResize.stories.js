import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

import { OnWindowResize } from '../..';

storiesOf('OnWindowResize', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <OnWindowResize>
        {isResponsive => (isResponsive ? <div>Showed!</div> : <div>Hidden!</div>)}
      </OnWindowResize>
    );
  })
  .add('controlled', () => {
    const breakpoint = select(
      'Breakpoint',
      {
        sm: 'sm',
        md: 'md',
        lg: 'lg',
        xl: 'xl',
      },
      'sm',
      'State',
    );
    return (
      <OnWindowResize breakpoint={breakpoint}>
        {isResponsive => (isResponsive ? <div>Showed!</div> : <div>Hidden!</div>)}
      </OnWindowResize>
    );
  });
