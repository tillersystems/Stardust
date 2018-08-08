import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, date } from '@storybook/addon-knobs';
import { DateTime, Interval } from 'luxon';

import { DateRangePicker } from '../../..';

const today = new Date();

storiesOf('Date - DateRangePicker', module)
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

    return <DateRangePicker maxDate={DateTime.fromJSDate(today)} locale={localeValue} />;
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

    const startDateValue = date('Start date', today, 'Value');
    const endDateValue = date('End date', today, 'Value');

    return (
      <DateRangePicker
        value={Interval.fromDateTimes(
          DateTime.fromMillis(startDateValue),
          DateTime.fromMillis(endDateValue),
        )}
        locale={localeValue}
      />
    );
  });
