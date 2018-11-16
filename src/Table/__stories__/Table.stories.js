import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';

import { Table } from '../..';

storiesOf('Table', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const getColsDef = () => [
      {
        title: 'DISH',
        value: d => d.code,
        align: 'left',
        sortable: true,
      },
      {
        title: 'PRICE',
        value: d => d.value,
        format: v => `${v.toFixed(2)} €`,
        width: '10rem',
        sortable: true,
      },
      {
        title: 'TAX',
        value: d => d.tax,
        format: v => `${v.toFixed(2)} %`,
        width: '10rem',
        sortable: true,
      },
    ];
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

    const compressedRows = boolean('compressedRows', false, 'State');
    const noZebra = boolean('No Zebra', false, 'State');
    const options = {
      top: 'top',
      bottom: 'bottom',
    };
    const headerPosition = select('Header position', options, 'top', 'State');

    return (
      <Table
        data={data}
        colsDef={getColsDef()}
        compressedRows={compressedRows}
        header={headerPosition}
        noZebra={noZebra}
      />
    );
  });
