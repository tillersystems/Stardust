import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';

import Wrapper from '../../Wrapper';
import { RadioGroup, RadioButton } from '../..';
import RadioGroupReadme from '../README.md';

const store = new Store({
  checked: false,
});

storiesOf('RadioGroup', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: RadioGroupReadme,
    },
  })
  .add('default', () => {
    const enabledValue = boolean('Enabled', true, 'state');
    const enabledRow = boolean('Is row ?', false, 'state');
    const onChange = action('onChange');

    return (
      <Wrapper>
        <State store={store}>
          <RadioGroup groupName="vegetable" isRow={enabledRow} onChange={onChange}>
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
      </Wrapper>
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
    const onChange = action('onChange');

    return (
      <Wrapper>
        <State store={store}>
          <RadioGroup
            groupName="vegetable"
            isRow={enabledRow}
            selectedValue={selectedValue}
            onChange={onChange}
          >
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
      </Wrapper>
    );
  });
