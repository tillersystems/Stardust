import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, date, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { DateTime } from 'luxon';

import { DatePicker } from '../../..';

const onChangeAction = action('onChange');
const today = new Date();

storiesOf('Date - DatePicker', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const localeValue = select(
      'Locale',
      {
        en: 'English',
        fr: 'French',
      },
      'English',
      'Locale',
    );

    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', today, 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', today, 'Bounds');

    return (
      <DatePicker
        locale={localeValue}
        minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
        maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
        onChange={date => onChangeAction(date)}
      />
    );
  })
  .add('controlled', () => {
    const localeValue = select(
      'Locale',
      {
        en: 'English',
        fr: 'French',
      },
      'English',
      'Locale',
    );

    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', today, 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', today, 'Bounds');

    const dateValue = date('Date', today, 'Value');

    return (
      <DatePicker
        locale={localeValue}
        date={DateTime.fromMillis(dateValue)}
        minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
        maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
        onChange={date => onChangeAction(date)}
      />
    );
  });
