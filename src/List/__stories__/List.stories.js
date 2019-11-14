/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';

import ListReadme from '../README.md';
import Wrapper from '../../Wrapper';
import { List } from '../..';

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ListReadme,
    },
  })
  .add('default', () => {
    const hasEvolution = boolean('Add evolution', false, 'Props');
    const locale = text('Locale', 'en', 'Props');

    const data = [
      {
        color: '#457b9d',
        label: 'Tartare de boeuf',
        amount: 328050,
        evolution: 0,
      },
      {
        color: '#eda3a3',
        label: 'Avocado Toast',
        amount: 226734,
        evolution: -0.06,
      },
      {
        color: '#a8dadc',
        label: 'Pavé de saumon',
        amount: 182934,
        evolution: 0.04,
      },
    ];

    const getLabel = ({ label, color }) => (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          role="presentation"
          style={{ marginRight: '5px' }}
        >
          <rect x="0" y="1.5" fill={color} width="10" height="10" rx="3" ry="3" />
        </svg>
        {label}
      </>
    );

    return (
      <Wrapper>
        <List
          currency="EUR"
          data={data.map(({ color, label, amount, evolution }) => ({
            label: getLabel({ label, color }),
            amount,
            ...(hasEvolution ? { evolution } : {}),
          }))}
          locale={locale}
        />
      </Wrapper>
    );
  });
