import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

import { CheckBox } from '../..';

const store = new Store({
  checked: true,
});

storiesOf('CheckBox', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <>
        <CheckBox checked disabled={!enabledValue}>
          A really cool choice
        </CheckBox>
        <CheckBox disabled={!enabledValue}>A really cool choice</CheckBox>
        <CheckBox disabled={!enabledValue}>A really cool choice</CheckBox>
      </>
    );
  })
  .add('controlled', () => {
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <State store={store}>
        {state => (
          <CheckBox
            checked={state.checked}
            disabled={!enabledValue}
            onChange={() => store.set({ checked: !store.get('checked') })}
          >
            What?
          </CheckBox>
        )}
      </State>
    );
  });
