import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import Wrapper from '../../Wrapper';
import { ToggleButton } from '../..';
import ToggleButtonReadme from '../README.md';

const onToggleAction = action('onToggle');

const store = new Store({
  checked: false,
});

storiesOf('ToggleButton', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ToggleButtonReadme,
    },
  })
  .add('with properties', () => {
    const disabledValue = boolean('Disabled', false, 'state');
    return (
      <Wrapper style={{ background: 'white' }}>
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
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const checkedValue = boolean('Checked', false, 'state');
    const disabledValue = boolean('Disabled', true, 'state');

    return (
      <Wrapper>
        <ToggleButton checked={checkedValue} disabled={disabledValue} />
      </Wrapper>
    );
  });
