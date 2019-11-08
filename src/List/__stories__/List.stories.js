/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import styled from 'styled-components';

import ListReadme from '../README.md';
import Wrapper from '../../Wrapper';
import { List } from '../..';

const Main = styled.span`
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
`;

const Secondary = styled.span`
  font-size: ${({ theme: { fonts } }) => fonts.size.medium};
  font-weight: ${({ theme: { fonts } }) => fonts.weight.thick};
  color: ${({ theme: { palette } }) => palette.primary.default};
`;

const Annexe = styled.span`
  width: 9rem;
  color: ${({ theme: { palette } }) => palette.success.default};
`;

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: ListReadme,
    },
  })
  .add('default', () => {
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
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" role="presentation">
          <rect x="0" y="1.5" fill={color} width="10" height="10" rx="3" ry="3" />
        </svg>
        {label}
      </>
    );

    return (
      <Wrapper>
        <List
          currency="EUR"
          data={data.map(row => ({
            ...row,
            label: getLabel(row),
          }))}
        />
      </Wrapper>
    );
  });
