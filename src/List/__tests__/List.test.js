/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';

import List from '..';
import Theme from '../../Theme';

const data = [
  {
    color: '#a8dadc',
    label: 'Pavé de saumon',
    amount: 1829,
  },
];

describe('<List />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(<List data={data} locale="en" />);

    const labelNode = getByText('Pavé de saumon');
    expect(labelNode).toBeInTheDocument();
    const amountNode = getByText(/1829/);
    expect(amountNode).toBeInTheDocument();
  });

  test('should render with formatted label', () => {
    const Main = styled.span`
      font-size: ${({ theme: { fonts } }) => fonts.size.medium};
    `;

    const formatLabel = ({ label }) => <Main>{label}</Main>;

    const { getByText } = render(
      <List
        data={data.map(row => ({
          ...row,
          label: formatLabel(row),
        }))}
      />,
    );

    const labelNode = getByText('Pavé de saumon');

    expect(labelNode).toHaveStyleRule('font-size', Theme.fonts.size.medium);
  });

  test('should render with extra information', () => {
    const data = [
      {
        color: '#a8dadc',
        label: 'Pavé de saumon',
        amount: 1829,
        evolution: 0.04,
      },
    ];

    const { getByText } = render(<List data={data} />);

    const evolutionNode = getByText(/4%/);
    expect(evolutionNode).toBeInTheDocument();
  });
});
