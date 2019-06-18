import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, date, boolean, number } from '@storybook/addon-knobs';
import { State, Store } from '@sambego/storybook-state';
import { action } from '@storybook/addon-actions';
import { DateTime, Interval } from 'luxon';

import DatePicker from '..';
import DatePickerReadme from '../README.md';

const onChangeAction = action('onChange');
const today = new Date();

const store = new Store({
  currentDate: DateTime.local(),
});

storiesOf('DatePicker', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: DatePickerReadme,
    },
  })
  .add('default', () => {
    const localeValue = select(
      'Locale',
      {
        English: 'en',
        French: 'fr',
      },
      'English',
      'Locale',
    );

    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', today, 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', today, 'Bounds');

    const numberOfMonthsToDisplay = number(
      'Number of month to display',
      1,
      { range: true, min: 1, max: 2, step: 1 },
      'Bounds',
    );

    const isRange = boolean('Range date picker', false, 'Type');

    return (
      <div style={{ background: 'white', padding: '16px', borderRadius: '4px' }}>
        <DatePicker
          numberOfMonthsToDisplay={numberOfMonthsToDisplay}
          rangePicker={isRange}
          locale={localeValue}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          onDateChanged={date => onChangeAction(date)}
        />
      </div>
    );
  })
  .add('controlled', () => {
    const localeValue = select(
      'Locale',
      {
        English: 'en',
        French: 'fr',
      },
      'English',
      'Locale',
    );

    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', today, 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', today, 'Bounds');

    const numberOfMonthsToDisplay = number(
      'Number of month to display',
      1,
      { range: true, min: 1, max: 2, step: 1 },
      'Bounds',
    );

    const isRange = boolean('Range date picker', false, 'Type');

    return (
      <div style={{ background: 'white', padding: '16px', borderRadius: '4px' }}>
        <State store={store}>
          {state => (
            <DatePicker
              numberOfMonthsToDisplay={numberOfMonthsToDisplay}
              rangePicker={isRange}
              locale={localeValue}
              defaultValue={state.currentDate}
              minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
              maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
              onDateChanged={date => onChangeAction(date)}
            />
          )}
        </State>
      </div>
    );
  })
  .add('controlled with an interval', () => {
    const localeValue = select(
      'Locale',
      {
        English: 'en',
        French: 'fr',
      },
      'English',
      'Locale',
    );

    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', today, 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', today, 'Bounds');

    const numberOfMonthsToDisplay = number(
      'Number of month to display',
      2,
      { range: true, min: 1, max: 2, step: 1 },
      'Bounds',
    );

    const isRange = boolean('Range date picker', true, 'Type');

    const interval = Interval.fromDateTimes(
      DateTime.fromObject({ year: 1982, month: 5, day: 25 }).startOf('day'),
      DateTime.fromObject({ year: 1982, month: 5, day: 27 }).endOf('day'),
    );

    return (
      <div style={{ background: 'white', padding: '16px', borderRadius: '4px' }}>
        <DatePicker
          numberOfMonthsToDisplay={numberOfMonthsToDisplay}
          rangePicker={isRange}
          locale={localeValue}
          defaultValue={interval}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          onDateChanged={date => onChangeAction(date)}
        />
      </div>
    );
  });
