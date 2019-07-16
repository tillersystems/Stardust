import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, boolean, number, select } from '@storybook/addon-knobs';

import { Button, Popover } from '../..';
import PopoverReadme from '../README.md';

const store = new Store({
  isOpen: false,
});

storiesOf('Popover', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: PopoverReadme,
      includePropTables: [Popover],
    },
  })
  .add('controlled', () => {
    const hasArrowValue = boolean('hasArrow', false, 'Props');
    const placement = select(
      'Placement',
      {
        bottom: 'bottom',
        top: 'top',
        right: 'right',
        left: 'left',
      },
      'bottom',
      'Props',
    );
    const isOverflowingContainer = boolean('isOverflowingContainer', false, 'Props');

    const widthValue = number(
      'Width',
      28,
      {
        range: true,
        min: 10,
        max: 60,
        step: 2,
      },
      'Props',
    );

    return (
      <div style={{ position: 'relative' }}>
        <State store={store}>
          <Popover
            isOpen={store.get('isOpen')}
            content="Ventes nettes (ventes brutes moins les réductions et les annulations) plus les taxes sur
          la période sélectionnée."
            hasArrow={hasArrowValue}
            modifiers={
              isOverflowingContainer
                ? {
                    preventOverflow: {
                      escapeWithReference: true,
                    },
                  }
                : {}
            }
            placement={placement}
            onClickOutside={() => store.set({ isOpen: false })}
            width={`${widthValue}rem`}
          >
            <Button
              appearance="primary"
              onClick={() => store.set({ isOpen: !store.get('isOpen') })}
            >
              Show Popover
            </Button>
          </Popover>
        </State>
      </div>
    );
  });
