/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';

import List from '..';
import Theme from '../../Theme';

describe('<List />', () => {
  test('should render without a problem', () => {
    const datas = [
      {
        icon: '#a8dadc',
        mainLabel: 'Pavé de saumon',
        secondaryLabel: '1 829 €',
        annexe: '+ 4%',
      },
    ];

    const { getByText } = render(<List datas={datas} />);

    const mainLabelNode = getByText('Pavé de saumon');

    expect(mainLabelNode).toBeInTheDocument();
  });

  test('should render without a problem with formated label', () => {
    const Main = styled.span`
      font-size: ${({ theme: { fonts } }) => fonts.size.medium};
    `;

    const datas = [
      {
        icon: '#a8dadc',
        mainLabel: 'Pavé de saumon',
        secondaryLabel: '1 829 €',
        annexe: '+ 4%',
      },
    ];

    const formatDatas = {
      mainLabel: value => <Main>{value}</Main>,
    };

    const { getByText } = render(<List datas={datas} formatDatas={formatDatas} />);

    const mainLabelNode = getByText('Pavé de saumon');

    expect(mainLabelNode).toHaveStyleRule('font-size', Theme.fonts.size.medium);
  });

  test('should render without a problem in line', () => {
    const Main = styled.span`
      font-size: ${({ theme: { fonts } }) => fonts.size.medium};
    `;

    const datas = [
      {
        icon: '#a8dadc',
        mainLabel: 'Pavé de saumon',
        secondaryLabel: '1 829 €',
        annexe: '+ 4%',
      },
    ];

    const formatDatas = {
      mainLabel: value => <Main>{value}</Main>,
    };

    const { getByTestId } = render(<List datas={datas} formatDatas={formatDatas} isInline />);

    const listItemNode = getByTestId('list-item');

    expect(listItemNode).toHaveStyleRule(
      'grid-template-areas',
      "'icon mainLabel secondaryLabel annexe'",
    );
  });
});
