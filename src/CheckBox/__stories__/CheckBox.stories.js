import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import { CheckBox } from '../..';
import CheckBoxReadme from '../README.md';

const store = new Store({
  checked: true,
});

storiesOf('CheckBox', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: CheckBoxReadme,
    },
  })
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');
    const onChangeAction = action('onChange');

    return (
      <>
        <CheckBox checked disabled={!enabledValue} onChange={() => onChangeAction()}>
          A really cool choice
        </CheckBox>
        <CheckBox disabled={!enabledValue} onChange={() => onChangeAction()}>
          A really cool choice
        </CheckBox>
        <CheckBox disabled={!enabledValue} onChange={() => onChangeAction()}>
          A really cool choice
        </CheckBox>
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
