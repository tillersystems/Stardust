import React from 'react';
import { act, fireEvent } from '@testing-library/react';

import Table from '..';
import Theme from '../../Theme';

/* eslint-disable react/prop-types */
const StubComponent = ({ value }) => <div>{value}</div>;
StubComponent.displayName = 'StubComponent';

const getColsDef = (taxCountryCode = 'fr') => [
  {
    title: 'DISH',
    isRowHeader: true,
    value: d => d.code,
    isSortable: true,
    align: 'left',
    total: d => d.code,
  },
  {
    title: 'PRICE',
    value: d => d.value,
    format: v => `${v.toFixed(2)} €`,
    align: 'right',
    isSortable: false,
    total: d => d.value,
  },
  {
    title: 'TAX',
    value: d => d.tax,
    format: v => `${v[taxCountryCode].toFixed(2)} %`,
    filteredBy: v => v[taxCountryCode],
    align: 'right',
    isSortable: true,
    total: d => d.tax,
  },
];

const data = [
  {
    code: 'Tartare de boeuf',
    value: 15.0,
    tax: {
      fr: 9.0,
      en: 10.0,
    },
  },
  {
    code: 'Oeuf cocotte',
    value: 13.0,
    tax: {
      fr: 7.0,
      en: 6.0,
    },
  },
  {
    code: 'Salade caesar',
    value: 16.0,
    tax: {
      fr: 10.0,
      en: 3.0,
    },
  },
];

const dataTotal = {
  code: 'Total',
  value: 58.0,
  tax: {
    fr: 30.0,
    en: 15.0,
  },
};

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

    const firstRowTax = getByText('9.00 %');
    const secondRowTax = getByText('7.00 %');
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

  test('should have clickable row', () => {
    const spy = jest.fn();
    const rowsDef = {
      onClick: spy,
    };
    const { getAllByTestId } = render(
      <Table colsDef={getColsDef()} rowsDef={rowsDef} data={data} />,
    );

    const [bodyRow] = getAllByTestId('body-row');

    expect(bodyRow).toHaveStyleRule('cursor', 'pointer');

    fireEvent.click(bodyRow);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('should render differently when clicked on sorting', () => {
    const { getByText, getAllByTestId } = render(
      <Table colsDef={getColsDef()} data={data} striped />,
    );

    const dishNode = getByText(/dish/i);

    const initialBodyRows = getAllByTestId('body-row');

    expect(initialBodyRows[0]).toHaveTextContent(/tartare de boeuf/i);

    act(() => {
      // Click on the the dish node
      fireEvent.click(dishNode);
    });

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

    act(() => {
      // Click on the the dish node
      fireEvent.click(priceNode);
    });

    const sortedBodyRows = getAllByTestId('body-row');

    expect(sortedBodyRows[0]).toHaveTextContent('15.00 €');
  });

  test('should render correctly when taxes are english', () => {
    const { getByText } = render(<Table colsDef={getColsDef('en')} data={data} striped />);

    const firstRowTax = getByText('10.00 %');
    const secondRowTax = getByText('6.00 %');
    const thirdRowTax = getByText('3.00 %');

    expect(firstRowTax).toBeInTheDocument();
    expect(secondRowTax).toBeInTheDocument();
    expect(thirdRowTax).toBeInTheDocument();
  });

  test('should sort correctly the column when it is hydrated with object', () => {
    const { getByText, getAllByTestId } = render(
      <Table colsDef={getColsDef()} data={data} striped />,
    );

    const taxNode = getByText(/tax/i);

    const initialBodyRows = getAllByTestId('body-row');

    expect(initialBodyRows[0]).toHaveTextContent('9.00 %');

    act(() => {
      // Click on the the tax node
      fireEvent.click(taxNode);
    });

    const sortedBodyRows = getAllByTestId('body-row');

    expect(sortedBodyRows[0]).toHaveTextContent('7.00 %');
  });

  test("should render correctly total row when it's needed", () => {
    const { getByTestId } = render(
      <Table dataTotal={dataTotal} colsDef={getColsDef()} data={data} striped />,
    );

    const footerRow = getByTestId('footer-row');

    expect(footerRow).toHaveTextContent('Total');
  });

  test('should be scrollable', () => {
    const { getByTestId } = render(
      <Table isScrollable height="10rem" colsDef={getColsDef()} data={data} striped />,
    );

    const tableContainer = getByTestId('table-container');

    expect(tableContainer).toHaveStyleRule('overflow', 'scroll');
  });

  test('should be hoverable', () => {
    const { getByText, getAllByTestId } = render(
      <Table isHoverable height="10rem" colsDef={getColsDef()} data={data} />,
    );

    const sortedBodyRows = getAllByTestId('body-row');

    expect(sortedBodyRows[0]).toHaveTextContent(/tartare de boeuf/i);

    act(() => {
      fireEvent.mouseOver(sortedBodyRows[0]);
    });

    const tartareRow = getByText(/tartare de boeuf/i);

    expect(tartareRow).toHaveStyleRule(`background-color: ${Theme.palette.veryLightGrey}`);
  });

  test('should have rows with children clickable and display its children on click', () => {
    const data = [
      {
        code: 'Tartare de boeuf',
        value: 15.0,
        tax: {
          fr: 9.0,
          en: 10.0,
        },
        children: [
          {
            code: 'child 1',
            value: 9.0,
            tax: {
              fr: 9.0,
              en: 10.0,
            },
          },
          {
            code: 'child 2',
            value: 8.0,
            tax: {
              fr: 9.0,
              en: 10.0,
            },
          },
        ],
      },
      {
        code: 'Oeuf cocotte',
        value: 13.0,
        tax: {
          fr: 7.0,
          en: 6.0,
        },
      },
    ];

    const { getAllByTestId, queryAllByText } = render(
      <Table height="10rem" colsDef={getColsDef()} data={data} />,
    );

    const [row] = getAllByTestId('body-row');

    act(() => {
      fireEvent.click(row);
    });

    const children = queryAllByText(/child/i);
    expect(children).toHaveLength(2);

    expect(row).toHaveStyleRule(
      'box-shadow',
      `inset 3px 0px 0 0px ${Theme.palette.primary.default}`,
      {
        modifier: ':nth-child(1n)',
      },
    );

    act(() => {
      fireEvent.click(row);
    });

    const noChildren = queryAllByText(/child/i);
    expect(noChildren).toHaveLength(0);
  });

  test('should handle multiple nested rows', () => {
    const data = [
      {
        code: 'Root',
        value: 15.0,
        tax: {
          fr: 9.0,
          en: 10.0,
        },
        children: [
          {
            code: 'child 1',
            value: 9.0,
            tax: {
              fr: 9.0,
              en: 10.0,
            },
            children: [
              {
                code: 'child 2',
                value: 9.0,
                tax: {
                  fr: 9.0,
                  en: 10.0,
                },
              },
            ],
          },
        ],
      },
    ];

    const { getAllByTestId, queryAllByText } = render(
      <Table height="10rem" colsDef={getColsDef()} data={data} />,
    );

    const [row] = getAllByTestId('body-row');

    // Uncollapse root row
    act(() => {
      fireEvent.click(row);
    });

    const children = queryAllByText(/child 1/i);
    expect(children).toHaveLength(1);

    // Uncollapse first child
    act(() => {
      fireEvent.click(children[0]);
    });

    const nestedChildren = queryAllByText(/child 2/i);
    expect(nestedChildren).toHaveLength(1);

    // Collapse Root row
    act(() => {
      fireEvent.click(row);
    });

    const noChildren = queryAllByText(/child/i);
    expect(noChildren).toHaveLength(0);
  });
});
