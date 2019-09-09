import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Table } from '../..';
import Wrapper from '../../Wrapper';
import TableReadme from '../README.md';

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: TableReadme,
    },
  })
  .add('default', () => {
    const striped = boolean('Striped', false, 'State');
    const selectableRow = boolean('Selectable row', false, 'State');
    const dishRowSortable = boolean('Dish row is sortable', true, 'State');
    const priceRowSortable = boolean('Price row is sortable', true, 'State');
    const taxRowSortable = boolean('Tax row is sortable', true, 'State');

    const options = {
      french: 'fr',
      english: 'en',
    };

    const taxCountryCodeValue = select('Selectable taxes country', options, 'fr', 'State');

    const getColsDef = (taxCountryCode = 'fr') => [
      {
        title: 'DISH',
        value: d => d.name,
        isSortable: dishRowSortable,
        align: 'left',
        isHidden: () => false,
      },
      {
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: priceRowSortable,
        isHidden: () => false,
      },
      {
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v[taxCountryCode].toFixed(2)} %`,
        filteredBy: v => v[taxCountryCode],
        align: 'right',
        isSortable: taxRowSortable,
        isHidden: () => false,
      },
    ];

    const onClickAction = action('onClick');

    const rowsDef = {
      selectable: selectableRow,
      onSelect: (item, key) => onClickAction(JSON.stringify(item), key),
    };

    const data = [
      {
        name: 'Tartare de boeuf',
        price: 15.0,
        tax: {
          fr: 9.0,
          en: 10.0,
        },
      },
      {
        name: 'Oeuf cocotte',
        price: 13.0,
        tax: {
          fr: 7.0,
          en: 6.0,
        },
      },
      {
        name: 'Salade caesar',
        price: 16.0,
        tax: {
          fr: 10.0,
          en: 3.0,
        },
      },
    ];

    return (
      <Wrapper>
        <Table
          data={data}
          colsDef={getColsDef(taxCountryCodeValue)}
          rowsDef={rowsDef}
          striped={striped}
        />
      </Wrapper>
    );
  })
  .add('Scrollable table', () => {
    const striped = boolean('Striped', false, 'State');

    const selectableRow = boolean('Selectable row', false, 'State');

    const dishColumnSortable = boolean('Dish column is sortable', true, 'State');
    const priceColumnSortable = boolean('Price column is sortable', true, 'State');
    const taxColumnSortable = boolean('Tax column is sortable', true, 'State');
    const quantityColumnSortable = boolean('Quantity column is sortable', true, 'State');
    const tvaColumnSortable = boolean('TVA column is sortable', true, 'State');
    const profitColumnSortable = boolean('Profit column is sortable', true, 'State');
    const discountColumnSortable = boolean('Discount column is sortable', true, 'State');

    const priceColumnIsHidden = boolean('Price column is hidden', false, 'State');
    const taxColumnIsHidden = boolean('Tax column is hidden', false, 'State');
    const quantityColumnIsHidden = boolean('Quantity column is hidden', false, 'State');
    const tvaColumnIsHidden = boolean('TVA column is hidden', false, 'State');
    const profitColumnIsHidden = boolean('Profit column is hidden', false, 'State');
    const discountColumnIsHidden = boolean('Discount column is hidden', false, 'State');

    const options = {
      french: 'fr',
      english: 'en',
    };

    const taxCountryCodeValue = select('Selectable taxes country', options, 'fr', 'State');

    const getColsDef = (taxCountryCode = 'fr') => [
      {
        title: 'DISH',
        value: d => d.name,
        isSortable: dishColumnSortable,
        align: 'left',
        total: d => d.name,
        isRowHeader: true,
        isHidden: () => false,
      },
      {
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: priceColumnSortable,
        total: d => d.price,
        isHidden: d => d.price,
      },
      {
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v[taxCountryCode].toFixed(2)} %`,
        filteredBy: v => v[taxCountryCode],
        align: 'right',
        isSortable: taxColumnSortable,
        total: d => d.tax,
        isHidden: d => d.tax,
      },
      {
        title: 'QUANTITY',
        value: d => d.quantity,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: quantityColumnSortable,
        total: d => d.quantity,
        isHidden: d => d.quantity,
      },
      {
        title: 'TVA',
        value: d => d.tva,
        format: v => `${v.toFixed(2)} %`,
        align: 'right',
        isSortable: tvaColumnSortable,
        total: d => d.tva,
        isHidden: d => d.tva,
      },
      {
        title: 'PROFIT',
        value: d => d.profit,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: profitColumnSortable,
        total: d => d.profit,
        isHidden: d => d.profit,
      },
      {
        title: 'DISCOUNT',
        value: d => d.discount,
        format: v => `${v.toFixed(2)} %`,
        align: 'right',
        isSortable: discountColumnSortable,
        total: d => d.discount,
        isHidden: d => d.discount,
      },
    ];

    const onClickAction = action('onClick');

    const rowsDef = {
      selectable: selectableRow,
      onSelect: (item, key) => onClickAction(JSON.stringify(item), key),
    };

    const data = [
      {
        name: 'Tartare de boeuf',
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
        name: 'Oeuf cocotte',
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
        name: 'Salade caesar',
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
        name: 'Escalope',
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
        name: 'Lasagnes',
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
        name: 'Bavette',
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
        name: 'Omelette',
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
    ];

    const dataTotal = {
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

    const dataIsHidden = {
      price: priceColumnIsHidden,
      tax: taxColumnIsHidden,
      quantity: quantityColumnIsHidden,
      tva: tvaColumnIsHidden,
      profit: profitColumnIsHidden,
      discount: discountColumnIsHidden,
    };

    return (
      <Wrapper>
        <Table
          isScrollable
          height="40rem"
          data={data}
          dataTotal={dataTotal}
          dataIsHidden={dataIsHidden}
          colsDef={getColsDef(taxCountryCodeValue)}
          rowsDef={rowsDef}
          striped={striped}
        />
      </Wrapper>
    );
  });
