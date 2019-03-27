import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, number, select, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Pagination } from '../..';

const callbackAction = action('page item clicked');

storiesOf('Pagination', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const breakValue = text('Break value', '...');
    const alignValue = select(
      'Alignment',
      {
        default: 'left',
        center: 'center',
        left: 'left',
        right: 'right',
      },
      'default',
      'Alignment',
    );
    const pageCountValue = number(
      'pageCount',
      10,
      {
        range: true,
        min: 1,
        max: 1000,
        step: 1,
      },
      'Page count',
    );
    return (
      <Pagination
        pageCount={pageCountValue}
        getRequestedPageNumber={() => callbackAction()}
        align={alignValue}
        breakLabel={breakValue}
      />
    );
  });
