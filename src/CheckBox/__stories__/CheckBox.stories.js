import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';

import Wrapper from '../../Wrapper';
import { CheckBox } from '../..';
import CheckBoxReadme from '../README.md';

const store = new Store({
  isChecked: true,
});

storiesOf('CheckBox', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: CheckBoxReadme,
    },
  })
  .add('uncontrolled state', () => {
    const disabledValue = boolean('Disabled', false, 'Props');
    const value = text('Value', 'I am a value', 'Props');

    const onChangeAction = action('onChange');

    return (
      <Wrapper>
        <CheckBox
          isDefaultChecked
          isDisabled={disabledValue}
          onChange={() => onChangeAction()}
          value={value}
        >
          A really cool choice
        </CheckBox>
        <CheckBox isDisabled={disabledValue} onChange={() => onChangeAction()} value={value}>
          A really cool choice
        </CheckBox>
        <CheckBox isDisabled={disabledValue} onChange={() => onChangeAction()} value={value}>
          A really cool choice
        </CheckBox>
      </Wrapper>
    );
  })
  .add('controlled state', () => {
    const disabledValue = boolean('Disabled', false, 'Props');

    return (
      <Wrapper>
        <State store={store}>
          {state => (
            <CheckBox
              isChecked={state.isChecked}
              isDisabled={disabledValue}
              onChange={isChecked => store.set({ isChecked })}
            >
              What?
            </CheckBox>
          )}
        </State>
      </Wrapper>
    );
  });
