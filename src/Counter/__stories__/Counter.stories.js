import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

import Wrapper from '../../Wrapper';
import { Counter } from '../..';
import CounterReadme from '../README.md';

const store = new Store({
  count: 0,
});

storiesOf('Counter', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme around story
      content: CounterReadme,
    },
  })
  .add('Uncontrolled state', () => {
    const step = number(
      'Step',
      1,
      {
        range: true,
        min: 1,
        max: 100,
        step: 1,
      },
      'Props',
    );
    const max = number(
      'Max value',
      100,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'Props',
    );
    const min = number(
      'Min value',
      0,
      {
        range: true,
        min: 0,
        max: 100,
        step: 1,
      },
      'Props',
    );
    const appearance = select(
      'Appearance',
      {
        default: 'default',
        primary: 'primary',
        secondary: 'secondary',
        success: 'success',
        failure: 'failure',
        google: 'google',
      },
      'secondary',
      'Props',
    );
    const widthValue = number(
      'Width',
      5,
      {
        range: true,
        min: 5,
        max: 50,
        step: 1,
      },
      'Props',
    );
    const OnIncrement = () => store.set({ count: store.get('count') + 1 });
    const OnDecrement = () => store.set({ count: store.get('count') - 1 });

    return (
      <Wrapper>
        <State store={store}>
          {state => (
            <Counter
              step={step}
              max={max}
              min={min}
              onIncrement={() => OnIncrement()}
              onDecrement={() => OnDecrement()}
              countValue={state.count}
              appearance={appearance}
              width={`${widthValue}rem`}
            />
          )}
        </State>
      </Wrapper>
    );
  });
