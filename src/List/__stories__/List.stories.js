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
    const isInline = boolean('is inline', false, 'State');

    const datas = [
      {
        icon: '#457b9d',
        mainLabel: 'Tartare de boeuf',
        secondaryLabel: '3 280 €',
        annexe: '+ 12%',
      },
      {
        icon: '#eda3a3',
        mainLabel: 'Avocado Toast',
        secondaryLabel: '2 267 €',
        annexe: '+ 6%',
      },
      {
        icon: '#a8dadc',
        mainLabel: 'Pavé de saumon',
        secondaryLabel: '1 829 €',
        annexe: '+ 4%',
      },
    ];

    const formatDatas = {
      icon: value => (
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" role="presentation">
          <rect x="0" y="1.5" fill={value} width="10" height="10" rx="3" ry="3" />
        </svg>
      ),
      mainLabel: value => <Main>{value}</Main>,
      secondaryLabel: value => <Secondary>{value}</Secondary>,
      annexe: value => <Annexe>{value}</Annexe>,
    };

    return (
      <Wrapper>
        <List datas={datas} formatDatas={formatDatas} isInline={isInline} />
      </Wrapper>
    );
  });
