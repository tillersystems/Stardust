import React from 'react';
import { fireEvent } from '@testing-library/react';

import Table from '..';
import Theme from '../../Theme';

/* eslint-disable react/prop-types */
const StubComponent = ({ value }) => <div>{value}</div>;
StubComponent.displayName = 'StubComponent';

const getColsDef = () => [
  {
    title: 'DISH',
    value: d => d.code,
    sortable: true,
    align: 'left',
  },
  {
    title: 'PRICE',
    value: d => d.value,
    format: v => `${v.toFixed(2)} €`,
    align: 'right',
    sortable: false,
  },
  {
    title: 'TAX',
    value: d => d.tax,
    format: v => `${v.toFixed(2)} %`,
    align: 'right',
    sortable: true,
  },
];

const data = [
  {
    code: 'Tartare de boeuf',
    value: 15.0,
    tax: 11.0,
  },
  {
    code: 'Oeuf cocotte',
    value: 13.0,
    tax: 12.0,
  },
  {
    code: 'Salade caesar',
    value: 16.0,
    tax: 10.0,
  },
];

describe('<Table />', () => {
  test('should render without a problem', () => {
    const { getByText, getAllByTestId } = render(<Table colsDef={getColsDef()} data={data} />);

    const firstRowTitle = getByText(data[0].code);
    const secondRowTitle = getByText(data[1].code);
    const thirdRowTitle = getByText(data[2].code);

    expect(firstRowTitle).toBeInTheDocument();
    expect(secondRowTitle).toBeInTheDocument();
    expect(thirdRowTitle).toBeInTheDocument();

    const firstRowValue = getByText('15.00 €');
    const secondRowValue = getByText('13.00 €');
    const thirdRowValue = getByText('16.00 €');

    expect(firstRowValue).toBeInTheDocument();
    expect(secondRowValue).toBeInTheDocument();
    expect(thirdRowValue).toBeInTheDocument();

    const firstRowTax = getByText('11.00 %');
    const secondRowTax = getByText('12.00 %');
    const thirdRowTax = getByText('10.00 %');

    expect(firstRowTax).toBeInTheDocument();
    expect(secondRowTax).toBeInTheDocument();
    expect(thirdRowTax).toBeInTheDocument();

    const bodyRows = getAllByTestId('body-row');

    expect(bodyRows.length).toBe(3);
  });

  test('should alternate rows of content with a darker color to increase contrast.', () => {
    const { getAllByTestId } = render(<Table colsDef={getColsDef()} data={data} striped />);

    const bodyRows = getAllByTestId('body-row');

    expect(bodyRows[0]).not.toHaveStyleRule('background', { modifier: ':nth-child(even)' });
    expect(bodyRows[1]).not.toHaveStyleRule(
      'background',
      JSON.stringify(Theme.palette.mysticGrey),
      {
        modifier: ':nth-child(even)',
      },
    );
    expect(bodyRows[2]).not.toHaveStyleRule('background', { modifier: ':nth-child(even)' });
  });

  test('should not have selectable row', () => {
    const { getAllByTestId } = render(<Table colsDef={getColsDef()} data={data} />);

    const bodyRows = getAllByTestId('body-row');

    expect(bodyRows[0]).not.toHaveStyleRule('cursor');

    // Click on the first body row
    fireEvent.click(bodyRows[0]);

    expect(bodyRows[0]).not.toHaveStyleRule('box-shadow');
  });

  test('should have selectable row', () => {
    const spy = jest.fn();
    const rowsDef = {
      selectable: true,
      onSelect: spy,
    };
    const { getAllByTestId } = render(
      <Table colsDef={getColsDef()} rowsDef={rowsDef} data={data} />,
    );

    const bodyRows = getAllByTestId('body-row');

    expect(bodyRows[0]).toHaveStyleRule('cursor', 'pointer');

    // Click on the first body row
    fireEvent.click(bodyRows[0]);

    expect(bodyRows[0]).toHaveStyleRule(
      'box-shadow',
      `inset 3px 0px 0 0px ${Theme.palette.primary.default}`,
    );

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should render differently when clicked on sorting', () => {
    const { getByText, getAllByTestId } = render(
      <Table colsDef={getColsDef()} data={data} striped />,
    );

    const dishNode = getByText(/dish/i);

    const initialBodyRows = getAllByTestId('body-row');

    expect(initialBodyRows[0]).toHaveTextContent(/tartare de boeuf/i);

    // Click on the the dish node
    fireEvent.click(dishNode);

    const sortedBodyRows = getAllByTestId('body-row');

    expect(sortedBodyRows[0]).toHaveTextContent(/oeuf cocotte/i);
  });

  test('should not render differently when clicked on sorting', () => {
    const { getByText, getAllByTestId } = render(
      <Table colsDef={getColsDef()} data={data} striped />,
    );

    const priceNode = getByText(/price/i);

    const initialBodyRows = getAllByTestId('body-row');

    expect(initialBodyRows[0]).toHaveTextContent('15.00 €');

    // Click on the the dish node
    fireEvent.click(priceNode);

    const sortedBodyRows = getAllByTestId('body-row');

    expect(sortedBodyRows[0]).toHaveTextContent('15.00 €');
  });
});
