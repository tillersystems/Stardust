import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs/react';
import { KpiBlock } from '../..';

storiesOf('KpiBlock', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const options = {
      range: true,
      min: -100,
      max: 100,
      step: 10,
    };
    const Variation = number('Variation', 50, options, 'Variation');
    const Title = text('Title', 'Commandes', 'Title');
    const Value = text('Value', '621', 'Value');
    const hasVariation = boolean('HasVariation', true, 'Variation');
    const withCustomeValue = boolean('withCustomeValue', false, 'Value');
    return (
      <KpiBlock
        value={withCustomeValue ? <div>19</div> : Value}
        title={Title}
        variation={hasVariation ? Variation : false}
      />
    );
  });
