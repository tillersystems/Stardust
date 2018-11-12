import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, select, number } from '@storybook/addon-knobs';

import { AlertProvider, AlertConsumer, Message, Button } from '../..';

const alertProps = {
  description: 'Message deleted',
  ariaLabel: 'Message deleted, click to undo',
  onCloseText: 'Undo',
};

storiesOf('Alert', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const optionsValues = {
      'Top Left': 'top-left',
      'Top Center': 'top-center',
      'Top Right': 'top-right',
      'Bottom Left': 'bottom-left',
      'Bottom Center': 'bottom-center',
      'Bottom Right': 'bottom-right',
    };
    const typeOptionsValues = {
      Success: 'success',
      Info: 'info',
      Warning: 'warning',
      Error: 'error',
    };
    const positionValue = select('Position', optionsValues, 'top-center', 'Options');
    const timeoutValue = number('Timeout', 3000, {}, 'Options');
    const typeValue = select('Type', typeOptionsValues, 'success', 'Options');

    const options = {
      position: positionValue,
      timeout: timeoutValue,
    };

    return (
      <AlertProvider component={Message} {...options}>
        <AlertConsumer>
          {({ show, hide }) => (
            <Button primary onClick={() => show({ ...alertProps, onClose: hide, type: typeValue })}>
              Show alert
            </Button>
          )}
        </AlertConsumer>
      </AlertProvider>
    );
  });
