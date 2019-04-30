import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Table } from '../..';

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const striped = boolean('Striped', false, 'State');
    const selectableRow = boolean('Selectable row', false, 'State');
    const dishRowSortable = boolean('Dish row is sortable', true, 'State');
    const priceRowSortable = boolean('Price row is sortable', true, 'State');
    const titleRowSortable = boolean('Title row is sortable', true, 'State');

    const getColsDef = () => [
      {
        title: 'DISH',
        value: d => d.code,
        sortable: dishRowSortable,
        align: 'left',
      },
      {
        title: 'PRICE',
        value: d => d.value,
        format: v => `${v.toFixed(2)} €`,
        align: 'right',
        sortable: priceRowSortable,
      },
      {
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v.toFixed(2)} %`,
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
        code: 'Tartare de boeuf',
        value: 15.0,
        tax: 10.0,
      },
      {
        code: 'Oeuf cocotte',
        value: 13.0,
        tax: 10.0,
      },
      {
        code: 'Salade caesar',
        value: 16.0,
        tax: 10.0,
      },
    ];

    return <Table data={data} colsDef={getColsDef()} rowsDef={rowsDef} striped={striped} />;
  });
