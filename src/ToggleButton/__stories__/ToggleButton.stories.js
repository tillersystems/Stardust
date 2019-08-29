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
  isChecked: false,
});

storiesOf('ToggleButton', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ToggleButtonReadme,
    },
  })
  .add('controlled', () => {
    const disabledValue = boolean('Disabled', false, 'state');

    const handleToggle = isChecked => {
      onToggleAction(isChecked);
      store.set({ isChecked });
    };

    return (
      <Wrapper style={{ background: 'white' }}>
        <State store={store}>
          {state => (
            <ToggleButton
              isChecked={state.isChecked}
              isDisabled={disabledValue}
              onToggle={handleToggle}
            />
          )}
        </State>
      </Wrapper>
    );
  })
  .add('uncontrolled', () => {
    const disabledValue = boolean('Disabled', false, 'state');

    return (
      <Wrapper style={{ background: 'white' }}>
        <ToggleButton onToggle={onToggleAction} isDefaultChecked isDisabled={disabledValue} />
      </Wrapper>
    );
  });
