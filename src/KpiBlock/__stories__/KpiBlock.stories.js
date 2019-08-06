import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';

import Wrapper from '../../Wrapper';
import { KpiBlock } from '../..';
import KpiBlockReadme from '../README.md';

storiesOf('KpiBlock', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: KpiBlockReadme,
    },
  })
  .add('default', () => {
    const options = {
      range: true,
      min: -100,
      max: 100,
      step: 10,
    };

    const Variation = number('Variation', 50, options, 'ALL');
    const Title = text('Title', 'Commandes', 'ALL');
    const Value = text('Value', '621', 'ALL');
    const hasVariation = boolean('HasVariation', true, 'ALL');
    const withCustomValue = boolean('withCustomValue', false, 'ALL');
    const isCompactedValue = boolean('isCompactedValue', false, 'ALL');

    return (
      <Wrapper>
        <KpiBlock
          value={withCustomValue ? <div>19</div> : Value}
          title={Title}
          variation={hasVariation ? Variation : false}
          isCompacted={isCompactedValue}
        />
      </Wrapper>
    );
  });
