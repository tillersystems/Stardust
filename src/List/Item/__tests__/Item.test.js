/* eslint-disable react/display-name */
import React from 'react';
import styled from 'styled-components';

import Item from '..';
import Theme from '../../../Theme';

const props = {
  amount: 1829,
  locale: 'en',
};

describe('<Item />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(<Item {...props}>Pavé de saumon</Item>);

    const labelNode = getByText('Pavé de saumon');
    expect(labelNode).toBeInTheDocument();
    const amountNode = getByText(/1,829/);
    expect(amountNode).toBeInTheDocument();
  });

  test('should render with currency', () => {
    const { getByText } = render(
      <Item {...props} currency="EUR">
        Pavé de saumon
      </Item>,
    );

    const amountNode = getByText(/€18.29/);
    expect(amountNode).toBeInTheDocument();
  });

  test('should render ', () => {
    const Main = styled.span`
      font-size: ${({ theme: { fonts } }) => fonts.size.medium};
    `;

    const { getByText } = render(
      <Item {...props}>
        <Main>Pavé de saumon</Main>
      </Item>,
    );

    const labelNode = getByText('Pavé de saumon');

    expect(labelNode).toHaveStyleRule('font-size', Theme.fonts.size.medium);
  });

  test('should render with extra information', () => {
    const { getByText } = render(
      <Item {...props} evolution={0.03}>
        Pavé de saumon
      </Item>,
    );

    const evolutionNode = getByText(/3%/);
    expect(evolutionNode).toBeInTheDocument();
  });
});
