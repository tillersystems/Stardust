import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, date, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { DateTime, Interval } from 'luxon';

import Wrapper from '../../Wrapper';
import DatePicker from '..';
import DatePickerReadme from '../README.md';

const onChangeAction = action('onChange');
const today = new Date();

storiesOf('DatePicker', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: DatePickerReadme,
    },
  })
  .add('uncontrolled state', () => {
    const localeValue = select(
      'Locale',
      {
        English: 'en',
        French: 'fr',
      },
      'English',
      'Props',
    );

    const withMinDate = boolean('With minimum date', false, 'Props');
    const minDateValue = date('Minimum date', today, 'Props');
    const withMaxDate = boolean('With maximum date', false, 'Props');
    const maxDateValue = date('Maximum date', today, 'Props');

    const numberOfMonthsToDisplay = number(
      'Number of months to display',
      1,
      { range: true, min: 1, max: 2, step: 1 },
      'Props',
    );

    const isRange = boolean('Range date picker', false, 'Props');
    const displayOnlyInMonth = boolean('Display only days in month', false, 'Props');

    return (
      <Wrapper style={{ background: 'white' }}>
        <DatePicker
          numberOfMonthsToDisplay={numberOfMonthsToDisplay}
          rangePicker={isRange}
          locale={localeValue}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          onDateChanged={date => onChangeAction(date)}
          displayOnlyInMonth={displayOnlyInMonth}
        />
      </Wrapper>
    );
  })
  .add('controlled state', () => {
    const localeValue = select(
      'Locale',
      {
        English: 'en',
        French: 'fr',
      },
      'English',
      'Props',
    );

    const defaultValue = date('Default date', today, 'Props');
    const withMinDate = boolean('With minimum date', false, 'Props');
    const minDateValue = date('Minimum date', today, 'Props');
    const withMaxDate = boolean('With maximum date', false, 'Props');
    const maxDateValue = date('Maximum date', today, 'Props');

    const numberOfMonthsToDisplay = number(
      'Number of months to display',
      1,
      { range: true, min: 1, max: 2, step: 1 },
      'Props',
    );

    const isRange = boolean('Range date picker', false, 'Props');
    const displayOnlyInMonth = boolean('Display only days in month', false, 'Props');

    return (
      <Wrapper style={{ background: 'white' }}>
        <DatePicker
          numberOfMonthsToDisplay={numberOfMonthsToDisplay}
          rangePicker={isRange}
          locale={localeValue}
          defaultValue={DateTime.fromMillis(defaultValue)}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          onDateChanged={date => onChangeAction(date)}
          displayOnlyInMonth={displayOnlyInMonth}
        />
      </Wrapper>
    );
  })
  .add('controlled state of an interval', () => {
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
    const displayOnlyInMonth = boolean('Display only days in month', false, 'Props');

    const interval = Interval.fromDateTimes(
      DateTime.fromObject({ year: 2019, month: 5, day: 25 }).startOf('day'),
      DateTime.fromObject({ year: 2019, month: 8, day: 27 }).endOf('day'),
    );

    return (
      <Wrapper style={{ background: 'white' }}>
        <DatePicker
          numberOfMonthsToDisplay={numberOfMonthsToDisplay}
          rangePicker={isRange}
          locale={localeValue}
          defaultValue={interval}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          onDateChanged={date => onChangeAction(date)}
          displayOnlyInMonth={displayOnlyInMonth}
        />
      </Wrapper>
    );
  });
