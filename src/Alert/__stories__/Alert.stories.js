import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';

import { Alert } from '../..';

storiesOf('Alert', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const success = boolean('Sucess', true, 'Type');
    const info = boolean('Info', false, 'Type');
    const warning = boolean('Warning', false, 'Type');
    const error = boolean('Error', false, 'Type');
    return (
      <Alert
        message="this a simple message"
        success={success}
        info={info}
        warning={warning}
        error={error}
      />
    );
  });
