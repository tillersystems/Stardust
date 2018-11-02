import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, boolean, number } from '@storybook/addon-knobs';

import { Button, Popover } from '../..';

const store = new Store({
  active: false,
});

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const widthValue = number(
      'Width',
      28,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Dimensions',
    );

    const arrowPositionXValue = number(
      'arrowPositionX',
      50,
      {
        range: true,
        min: 5,
        max: 90,
        step: 1,
      },
      'Dimensions',
    );

    return (
      <div style={{ position: 'relative' }}>
        <Button primary onClick={() => store.set({ active: !store.get('active') })}>
          Show Popover
        </Button>
        <div style={{ position: 'absolute', top: '100%', left: '-78px' }}>
          <State store={store}>
            <Popover
              width={`${widthValue}rem`}
              arrowPositionX={`${(widthValue * arrowPositionXValue) / 100}rem`}
              active={store.get('active')}
            >
              Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes
              sur la période séléctionnée.
            </Popover>
          </State>
        </div>
      </div>
    );
  })
  .add('controlled', () => {
    const activeValue = boolean('Active', false, 'State');

    const widthValue = number(
      'Width',
      60,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Dimensions',
    );

    return (
      <div>
        <span>Control modal from knobs!</span>
        <Popover width={`${widthValue}rem`} active={activeValue}>
          Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes sur
          la période séléctionnée.
        </Popover>
      </div>
    );
  });
