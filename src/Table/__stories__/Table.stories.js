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
    const titleRowSortable = boolean('Title row is sortable', true, 'State');

    const options = {
      french: 'fr',
      english: 'en',
    };

    const taxCountryCodeValue = select('Selectable taxes country', options, 'fr', 'State');

    const getColsDef = (taxCountryCode = 'fr') => [
      {
        title: 'DISH',
        value: d => d.name,
        sortable: dishRowSortable,
        align: 'left',
      },
      {
        title: 'PRICE',
        value: d => d.price,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        sortable: priceRowSortable,
      },
      {
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v[taxCountryCode].toFixed(2)} %`,
        filteredBy: v => v[taxCountryCode],
        align: 'right',
        sortable: titleRowSortable,
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
  });
