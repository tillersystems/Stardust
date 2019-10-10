import React from 'react';
import { fireEvent } from '@testing-library/react';

import TableVirtualized from '..';
import Theme from '../../Theme';

/* eslint-disable react/prop-types */
const StubComponent = ({ value }) => <div>{value}</div>;
StubComponent.displayName = 'StubComponent';

const getColsDef = (taxCountryCode = 'fr') => [
  {
    title: 'DISH',
    value: ({ item }) => item.code,
    isSortable: true,
    align: 'left',
    total: ({ item }) => item.code,
  },
  {
    title: 'PRICE',
    value: ({ item }) => item.value,
    format: ({ item }) => `${item.value.toFixed(2)} €`,
    align: 'right',
    isSortable: false,
    total: ({ item }) => item.value,
  },
  {
    title: 'TAX',
    value: ({ item }) => item.tax,
    format: ({ item }) => `${item.tax[taxCountryCode].toFixed(2)} %`,
    filteredBy: ({ item }) => item.tax[taxCountryCode],
    align: 'right',
    isSortable: true,
    total: ({ item }) => item.tax,
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

const footerData = {
  code: 'Total',
  value: 58.0,
  tax: {
    fr: 30.0,
    en: 15.0,
  },
};

describe('<TableVirtualized />', () => {
  test('should render without a problem', () => {
    const { getByText } = render(
      <TableVirtualized
        colsDef={getColsDef()}
        data={data}
        footerData={footerData}
        height={400}
        widthFixedColumn={250}
      />,
    );

    const firstRowTitle = getByText(data[0].code);
    const secondRowTitle = getByText(data[1].code);
    const thirdRowTitle = getByText(data[2].code);

    expect(firstRowTitle).toBeInTheDocument();
    expect(secondRowTitle).toBeInTheDocument();
    expect(thirdRowTitle).toBeInTheDocument();
  });
});
