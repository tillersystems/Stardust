import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
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
        <CheckBox
          id="checkBox1"
          key="checkBox1"
          disabled={!enabledValue}
          textAnnexe="You really should pick that choice."
        >
          A really cool choice
        </CheckBox>
        <CheckBox id="checkBox2" key="checkBox2" disabled={!enabledValue}>
          A really cool choice
        </CheckBox>
        <CheckBox id="checkBox3" key="checkBox3" disabled={!enabledValue}>
          A really cool choice
        </CheckBox>
      </State>
    );
  })
  .add('controlled', () => {
    const checkedValue = boolean('Checked', false, 'state');
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <CheckBox checked={checkedValue} disabled={!enabledValue}>
        What?
      </CheckBox>
    );
  });
