import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, date } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { DateTime } from 'luxon';

import Wrapper from '../../../Wrapper';
import DatePickerInput from '..';
import DatePickerInputReadme from '../README.md';

const onChangeAction = action('onChange');
const value = new Date(2019, 10, 1);

storiesOf('Input - DatePickerInput', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: DatePickerInputReadme,
    },
  })
  .add('default', () => {
    return (
      <Wrapper>
        <DatePickerInput onDateChange={value => onChangeAction(value)} />
      </Wrapper>
    );
  })
  .add('controlled', () => {
    const dateValue = date('Date', value, 'Props');
    const errorValue = boolean('Error', false, 'Props');
    const withMinDate = boolean('With minimum date', false, 'Bounds');
    const minDateValue = date('Minimum date', new Date(2019, 1, 1), 'Bounds');
    const withMaxDate = boolean('With maximum date', false, 'Bounds');
    const maxDateValue = date('Maximum date', new Date(2019, 11, 1), 'Bounds');

    return (
      <Wrapper>
        <DatePickerInput
          value={DateTime.fromMillis(dateValue)}
          onChange={date => onChangeAction(date)}
          minDate={withMinDate ? DateTime.fromMillis(minDateValue) : null}
          maxDate={withMaxDate ? DateTime.fromMillis(maxDateValue) : null}
          error={errorValue}
        />
      </Wrapper>
    );
  });
