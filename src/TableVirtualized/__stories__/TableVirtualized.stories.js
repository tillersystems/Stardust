import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { TableVirtualized } from '../..';
import Wrapper from '../../Wrapper';
import TableVirtualizedReadme from '../README.md';

storiesOf('TableVirtualized', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      content: TableVirtualizedReadme,
    },
  })
  .add('default', () => {
    const striped = boolean('Striped', false, 'State');
    const selectableRow = boolean('Selectable row', false, 'State');
    const dishRowSortable = boolean('Dish row is sortable', true, 'State');
    const priceRowSortable = boolean('Price row is sortable', true, 'State');
    const taxRowSortable = boolean('Tax row is sortable', true, 'State');
    const quantityRowSortable = boolean('Quantity row is sortable', true, 'State');
    const tvaRowSortable = boolean('TVA row is sortable', true, 'State');
    const profitRowSortable = boolean('Profit row is sortable', true, 'State');
    const discountRowSortable = boolean('Discount row is sortable', true, 'State');

    const options = {
      french: 'fr',
      english: 'en',
    };

    const taxCountryCodeValue = select('Selectable taxes country', options, 'fr', 'State');

    const getColsDef = (taxCountryCode = 'fr') => [
      {
        title: 'DISH',
        value: ({ item }) => item.name,
        isSortable: dishRowSortable,
        justifyContent: 'flex-start',
        isRowHeader: true,
      },
      {
        title: 'PRICE',
        value: ({ item }) => item.price,
        format: ({ item }) => `${item.price.toFixed(2)} €`,
        justifyContent: 'flex-end',
        isSortable: priceRowSortable,
      },
      {
        title: 'TAX',
        value: ({ item }) => item.tax,
        format: ({ item }) => `${item.tax[taxCountryCode].toFixed(2)} %`,
        filteredBy: ({ item }) => item.tax[taxCountryCode],
        justifyContent: 'flex-end',
        isSortable: taxRowSortable,
      },
      {
        title: 'QUANTITY',
        value: ({ item }) => item.quantity,
        justifyContent: 'flex-end',
        isSortable: quantityRowSortable,
      },
      {
        title: 'TVA',
        value: ({ item }) => item.tva,
        format: ({ item }) => `${item.tva.toFixed(2)} %`,
        justifyContent: 'flex-end',
        isSortable: tvaRowSortable,
      },
      {
        title: 'PROFIT',
        value: ({ item }) => item.profit,
        format: ({ item }) => `${item.profit.toFixed(2)} €`,
        justifyContent: 'flex-end',
        isSortable: profitRowSortable,
      },
      {
        title: 'DISCOUNT',
        value: ({ item }) => item.discount,
        format: ({ item }) => `${item.discount.toFixed(2)} %`,
        justifyContent: 'flex-end',
        isSortable: discountRowSortable,
      },
    ];

    const onClickAction = action('onClick');

    const rowsDef = {
      isSelectable: selectableRow,
      onSelect: (item, key) => onClickAction(JSON.stringify(item), key),
    };

    const data = [
      {
        name: 'Buddha bowl',
        price: 15.0,
        tax: {
          fr: 9.0,
          en: 10.0,
        },
        quantity: 1,
        tva: 22,
        profit: 1,
        discount: 1,
      },
      {
        name: 'Glazed butternut squash bundt cake with walnuts, hazel nuts and raisins',
        price: 10.0,
        tax: {
          fr: 5.0,
          en: 8.0,
        },
        quantity: 10,
        tva: 10,
        profit: 9,
        discount: 2,
      },
      {
        name: 'Poached eggs with truffe',
        price: 11.0,
        tax: {
          fr: 7.0,
          en: 6.0,
        },
        quantity: 2,
        tva: 20,
        profit: 4,
        discount: 15,
      },
      {
        name: 'Carrot cake',
        price: 13.0,
        tax: {
          fr: 10.0,
          en: 3.0,
        },
        quantity: 5,
        tva: 19,
        profit: 9,
        discount: 10,
      },
      {
        name: 'Onion soup',
        price: 16.0,
        tax: {
          fr: 10.0,
          en: 3.0,
        },
        quantity: 2,
        tva: 15,
        profit: 15,
        discount: 10,
      },
      {
        name: 'Coconut milk dahl',
        price: 12.0,
        tax: {
          fr: 5.0,
          en: 7.0,
        },
        quantity: 9,
        tva: 10,
        profit: 5,
        discount: 5,
      },
      {
        name: 'Sweet and sour cauliflower',
        price: 23.0,
        tax: {
          fr: 4.0,
          en: 2.0,
        },
        quantity: 6,
        tva: 14,
        profit: 5,
        discount: 3,
      },
      {
        name: 'Miso soup',
        price: 8.0,
        tax: {
          fr: 9.0,
          en: 12.0,
        },
        quantity: 12,
        tva: 12,
        profit: 9,
        discount: 1,
      },
      {
        name: 'Avocado and tomato salad',
        price: 15.0,
        tax: {
          fr: 9.0,
          en: 10.0,
        },
        quantity: 1,
        tva: 22,
        profit: 1,
        discount: 1,
      },
      {
        name: 'Sweet potato curry',
        price: 11.0,
        tax: {
          fr: 7.0,
          en: 6.0,
        },
        quantity: 2,
        tva: 20,
        profit: 4,
        discount: 15,
      },
      {
        name: 'Roasted Parmigiano eggplant',
        price: 13.0,
        tax: {
          fr: 10.0,
          en: 3.0,
        },
        quantity: 5,
        tva: 19,
        profit: 9,
        discount: 10,
      },
      {
        name: 'Lettuce wraps',
        price: 16.0,
        tax: {
          fr: 10.0,
          en: 3.0,
        },
        quantity: 2,
        tva: 15,
        profit: 15,
        discount: 10,
      },
      {
        name: 'Chili sin carne',
        price: 12.0,
        tax: {
          fr: 5.0,
          en: 7.0,
        },
        quantity: 9,
        tva: 10,
        profit: 5,
        discount: 5,
      },
      {
        name: 'Ricotta pasta',
        price: 23.0,
        tax: {
          fr: 4.0,
          en: 2.0,
        },
        quantity: 6,
        tva: 14,
        profit: 5,
        discount: 3,
      },
      {
        name: 'Stuffed peppers with cream cheese and quinoa',
        price: 18.0,
        tax: {
          fr: 4.0,
          en: 6.0,
        },
        quantity: 5,
        tva: 12,
        profit: 4,
        discount: 1,
      },
      {
        name: 'Pistachio cake',
        price: 12.0,
        tax: {
          fr: 9.0,
          en: 12.0,
        },
        quantity: 15,
        tva: 8,
        profit: 6,
        discount: 3,
      },
    ];

    const footerData = {
      name: 'Total',
      price: 60.0,
      tax: {
        fr: 10.0,
        en: 3.0,
      },
      quantity: 2,
      tva: 30,
      profit: 4,
      discount: 10,
    };

    return (
      <Wrapper>
        <TableVirtualized
          colsDef={getColsDef(taxCountryCodeValue)}
          data={data}
          footerData={footerData}
          height={400}
          rowsDef={rowsDef}
          striped={striped}
          widthFixedColumn={250}
        />
      </Wrapper>
    );
  });
