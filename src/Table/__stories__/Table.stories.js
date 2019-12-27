import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, optionsKnob, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { State, Store } from '@sambego/storybook-state';

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
    const isHoverable = boolean('Hoverable', false, 'State');
    const clickableRow = boolean('Clickable row', false, 'State');
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
        name: 'dish',
        title: 'DISH',
        value: d => d.name,
        isSortable: dishRowSortable,
        isRowHeader: true,
        align: 'left',
      },
      {
        name: 'price',
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: priceRowSortable,
      },
      {
        name: 'tax',
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v[taxCountryCode].toFixed(2)} %`,
        sortBy: d => d.tax[taxCountryCode],
        align: 'right',
        isSortable: taxRowSortable,
      },
    ];

    const onClickAction = action('onClick');

    const rowsDef = {
      ...(clickableRow ? { onClick: (item, key) => onClickAction(JSON.stringify(item), key) } : {}),
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
          isHoverable={isHoverable}
        />
      </Wrapper>
    );
  })
  .add('Controlled sort', () => {
    const store = new Store({
      selectedSort: { column: 'dish', order: 'desc' },
    });

    const colsDef = [
      {
        name: 'dish',
        title: 'DISH',
        value: d => d.name,
        isSortable: true,
        isRowHeader: true,
        align: 'left',
      },
      {
        name: 'price',
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: true,
        defaultSortOrder: 'desc',
      },
      {
        name: 'quantity',
        title: 'QUANTITY',
        value: d => d.quantity,
        align: 'right',
        isSortable: false,
      },
    ];

    const onSortChangeAction = action('onSortChange');

    const data = [
      {
        name: 'Tartare de boeuf',
        price: 15.0,
        quantity: 20,
      },
      {
        name: 'Oeuf cocotte',
        price: 13.0,
        quantity: 7,
      },
      {
        name: 'Salade caesar',
        price: 16.0,
        quantity: 12,
      },
    ];

    return (
      <Wrapper>
        <State store={store}>
          {state => (
            <Table
              data={data}
              sort={state.selectedSort}
              onSortChange={sort => {
                onSortChangeAction(sort);
                store.set({ selectedSort: sort });
              }}
              colsDef={colsDef}
            />
          )}
        </State>
      </Wrapper>
    );
  })
  .add('Scrollable table', () => {
    const stickyRowHeader = boolean('stickyRowHeader', true, 'State');

    const getColsDef = (taxCountryCode = 'fr') => [
      {
        name: 'dish',
        title: 'DISH',
        value: d => d.name,
        isSortable: dishRowSortable,
        align: 'left',
        isRowHeader: stickyRowHeader,
        total: d => d.name,
      },
      {
        name: 'price',
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: priceRowSortable,
        total: d => d.price,
        defaultSortOrder: 'desc',
      },
      {
        name: 'tax',
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v[taxCountryCode].toFixed(2)} %`,
        align: 'right',
        total: d => d.tax,
        sortBy: d => d.tax[taxCountryCode],
        isSortable: taxRowSortable,
        defaultSortOrder: 'desc',
      },
      {
        name: 'quantity',
        title: 'QUANTITY',
        value: d => d.quantity,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        total: d => d.quantity,
        isSortable: quantityRowSortable,
        defaultSortOrder: 'desc',
      },
      {
        name: 'tva',
        title: 'TVA',
        value: d => d.tva,
        format: v => `${v.toFixed(2)} %`,
        align: 'right',
        isSortable: tvaRowSortable,
        total: d => d.tva,
        defaultSortOrder: 'desc',
      },
      {
        name: 'profit',
        title: 'PROFIT',
        value: d => d.profit,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        isSortable: profitRowSortable,
        total: d => d.profit,
        defaultSortOrder: 'desc',
      },
      {
        name: 'discount',
        title: 'DISCOUNT',
        value: d => d.discount,
        format: v => `${v.toFixed(2)} %`,
        align: 'right',
        isSortable: discountRowSortable,
        total: d => d.discount,
        defaultSortOrder: 'desc',
      },
    ];

    const striped = boolean('Striped', false, 'State');
    const isHoverable = boolean('Hoverable', false, 'State');
    const clickableRow = boolean('Clickable row', false, 'State');

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

    const columnsDefinition = getColsDef();
    const columns = {};
    for (const col in columnsDefinition) {
      columns[columnsDefinition[col].title] = columnsDefinition[col].title;
    }

    const columnsToDisplay = optionsKnob(
      'Columns to display',
      columns,
      getColsDef().map(c => c.title),
      { display: 'multi-select' },
      'State',
    );

    const onClickAction = action('onClick');

    const rowsDef = {
      ...(clickableRow ? { onClick: (item, key) => onClickAction(JSON.stringify(item), key) } : {}),
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
        children: [
          {
            name: 'Option 1',
            price: 9.0,
            tax: {
              fr: 9.0,
              en: 10.0,
            },
            quantity: 2,
            tva: 20,
            profit: 4,
            discount: 10,
          },
          {
            name: 'Option 2',
            price: 8.0,
            tax: {
              fr: 9.0,
              en: 10.0,
            },
            quantity: 2,
            tva: 20,
            profit: 4,
            discount: 10,
          },
        ],
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
        name: 'Nested1',
        price: 8.0,
        tax: {
          fr: 9.0,
          en: 12.0,
        },
        quantity: 12,
        tva: 12,
        profit: 9,
        discount: 1,
        children: [
          {
            name: 'Nested 2',
            price: 8.0,
            tax: {
              fr: 9.0,
              en: 12.0,
            },
            quantity: 12,
            tva: 12,
            profit: 9,
            discount: 1,
            children: [
              {
                name: 'Nested 3',
                price: 8.0,
                tax: {
                  fr: 9.0,
                  en: 12.0,
                },
                quantity: 12,
                tva: 12,
                profit: 9,
                discount: 1,
                children: [
                  {
                    name: 'Nested 4',
                    price: 8.0,
                    tax: {
                      fr: 9.0,
                      en: 12.0,
                    },
                    quantity: 12,
                    tva: 12,
                    profit: 9,
                    discount: 1,
                    children: [
                      {
                        name: 'Nested 5',
                        price: 8.0,
                        tax: {
                          fr: 9.0,
                          en: 12.0,
                        },
                        quantity: 12,
                        tva: 12,
                        profit: 9,
                        discount: 1,
                        children: [
                          {
                            name: 'Nested 6',
                            price: 8.0,
                            tax: {
                              fr: 9.0,
                              en: 12.0,
                            },
                            quantity: 12,
                            tva: 12,
                            profit: 9,
                            discount: 1,
                            children: [
                              {
                                name: 'Nested 7A',
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
                                name: 'Nested 7B',
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
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
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

    return (
      <Wrapper>
        <Table
          isScrollable
          isHoverable={isHoverable}
          height="40rem"
          data={data}
          dataTotal={dataTotal}
          colsDef={getColsDef(taxCountryCodeValue).filter(col =>
            columnsToDisplay.includes(col.title),
          )}
          rowsDef={rowsDef}
          striped={striped}
        />
      </Wrapper>
    );
  });
