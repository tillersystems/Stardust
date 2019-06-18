import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

import { RadioButton } from '../..';
import RadioButtonReadme from '../README.md';

const store = new Store({
  checked: false,
});

storiesOf('RadioButton', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: RadioButtonReadme,
    },
  })
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');

    let selectedValue = 'apple';
    return (
      <State store={store}>
        <RadioButton
          disabled={!enabledValue}
          selectedValue={selectedValue}
          key="apple"
          id="apple"
          name="fruit"
          value="apple"
        >
          apple
        </RadioButton>
      </State>
    );
  })
  .add('controlled', () => {
    const options = {
      apple: 'apple',
      watermelon: 'watermelon',
      apricot: 'apricot',
    };
    const selectedValue = select('Selected value', options, 'watermelon', 'state');
    const enabledValue = boolean('Enabled', true, 'state');

    return (
      <State store={store}>
        <RadioButton
          disabled={!enabledValue}
          selectedValue={selectedValue}
          key="apple"
          id="apple"
          name="fruit"
          value="apple"
        >
          apple
        </RadioButton>
      </State>
    );
  });
