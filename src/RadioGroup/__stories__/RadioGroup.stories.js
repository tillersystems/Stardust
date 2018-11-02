import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';

import { RadioGroup, RadioButton } from '../..';

const store = new Store({
  checked: false,
});

storiesOf('RadioGroup', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');
    const enabledRow = boolean('Is row ?', false, 'state');

    return (
      <State store={store}>
        <RadioGroup groupName="vegetable" isRow={enabledRow}>
          <RadioButton disabled={!enabledValue} value="artichoke" id="artichoke">
            artichoke
          </RadioButton>
          <RadioButton disabled={!enabledValue} value="beetroot" id="beetroot">
            beetroot
          </RadioButton>
          <RadioButton disabled={!enabledValue} value="pumpkin" id="pumpkin">
            pumpkin
          </RadioButton>
        </RadioGroup>
      </State>
    );
  })
  .add('controlled', () => {
    const options = {
      artichoke: 'artichoke',
      beetroot: 'beetroot',
      pumpkin: 'pumpkin',
    };
    const selectedValue = select('Selected value', options, 'artichoke', 'state');
    const enabledValue = boolean('Enabled', true, 'state');
    const enabledRow = boolean('Is row ?', false, 'state');

    return (
      <State store={store}>
        <RadioGroup groupName="vegetable" isRow={enabledRow} selectedValue={selectedValue}>
          <RadioButton disabled={!enabledValue} value="artichoke" id="artichoke">
            artichoke
          </RadioButton>
          <RadioButton disabled={!enabledValue} value="beetroot" id="beetroot">
            beetroot
          </RadioButton>
          <RadioButton disabled={!enabledValue} value="pumpkin" id="pumpkin">
            pumpkin
          </RadioButton>
        </RadioGroup>
      </State>
    );
  });
