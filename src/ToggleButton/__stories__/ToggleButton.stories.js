import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import { ToggleButton } from '../..';

const onToggleAction = action('onToggle');

const store = new Store({
  checked: false,
});

storiesOf('ToggleButton', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const disabledValue = boolean('Disabled', false, 'state');
    return (
      <State store={store}>
        <ToggleButton
          checked={store.get('checked')}
          disabled={disabledValue}
          onToggle={checked => {
            onToggleAction(checked);
            store.set({ checked });
          }}
        />
      </State>
    );
  })
  .add('controlled', () => {
    const checkedValue = boolean('Checked', false, 'state');
    const disabledValue = boolean('Disabled', true, 'state');

    return <ToggleButton checked={checkedValue} disabled={disabledValue} />;
  });
