import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

import Wrapper from '../../Wrapper';
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
    const enabledValue = boolean('Enabled', true, 'Props');
    const selectedValue = 'apple';

    return (
      <Wrapper>
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
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const options = {
      apple: 'apple',
      watermelon: 'watermelon',
      apricot: 'apricot',
    };
    const selectedValue = select('Selected value', options, 'watermelon', 'Props');
    const enabledValue = boolean('Enabled', true, 'Props');

    return (
      <Wrapper>
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
      </Wrapper>
    );
  });
