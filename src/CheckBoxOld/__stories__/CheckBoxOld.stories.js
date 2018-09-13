import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';

import { CheckBoxOld } from '../..';

const store = new Store({
  checked: false,
});

storiesOf('CheckBoxOld', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <State store={store}>
        <CheckBoxOld disabled={!enabledValue}>A really cool choice</CheckBoxOld>
      </State>
    );
  })
  .add('controlled', () => {
    const checkedValue = boolean('Checked', false, 'state');
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <CheckBoxOld checked={checkedValue} disabled={!enabledValue} onChange={() => {}}>
        What?
      </CheckBoxOld>
    );
  });
