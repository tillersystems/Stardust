import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';

import { CheckBox } from '../..';

const store = new Store({
  checked: false,
});

storiesOf('CheckBox', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <State store={store}>
        <CheckBox disabled={!enabledValue} textAnnexe="You really should pick that choice.">
          A really cool choice
        </CheckBox>
        <CheckBox disabled={!enabledValue}>A really cool choice</CheckBox>
        <CheckBox disabled={!enabledValue}>A really cool choice</CheckBox>
      </State>
    );
  })
  .add('controlled', () => {
    const checkedValue = boolean('Checked', false, 'state');
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <CheckBox checked={checkedValue} disabled={!enabledValue} onChange={() => {}}>
        What?
      </CheckBox>
    );
  });
