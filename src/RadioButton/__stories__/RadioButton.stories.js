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
    let selectedValue = 'apple';

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
          <RadioButton
            disabled={!enabledValue}
            selectedValue={selectedValue}
            key="banana"
            id="banana"
            name="fruit"
            value="banana"
          >
            banana
          </RadioButton>
        </State>
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const options = {
      apple: 'apple',
      banana: 'banana',
      apricot: 'apricot',
    };
    const selectedValue = select('Selected value', options, 'banana', 'Props');
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
          <RadioButton
            disabled={!enabledValue}
            selectedValue={selectedValue}
            key="banana"
            id="banana"
            name="fruit"
            value="banana"
          >
            banana
          </RadioButton>
        </State>
      </Wrapper>
    );
  });
