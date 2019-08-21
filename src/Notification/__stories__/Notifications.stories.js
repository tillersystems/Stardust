import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';

import { NotificationProvider, useNotifications } from '../provider';
import Button from '../../Button';
import Message from '../../Message';
import Wrapper from '../../Wrapper';
import NotificationReadme from '../README.md';

/*eslint react/prop-types:0*/
const NotificationComponent = ({ autoDismiss, autoDismissTimeout, pauseOnHover }) => {
  const { addNotification, dismissNotification } = useNotifications();
  const Component = () => (
    <Message description="this is a message" type="success" onClose={dismissNotification} />
  );

  return (
    <Button
      appearance="primary"
      onClick={() => addNotification(Component, { autoDismiss, autoDismissTimeout, pauseOnHover })}
    >
      Add Notification
    </Button>
  );
};

storiesOf('Notification', module)
  .addDecorator(withKnobs)
  .addParameters({
    readme: {
      // Show readme before story
      content: NotificationReadme,
    },
  })
  .add('default', () => {
    const autoDismiss = boolean('autoDismiss', false, 'Options');
    const pauseOnHover = boolean('pauseOnHover', false, 'Options');
    const placement = select(
      'placement',
      ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-left'],
      'bottom-right',
      'Options',
    );
    const autoDismissTimeout = number(
      'autoDismissTimeout',
      3000,
      { range: true, min: 1000, max: 6000, step: 1000 },
      'Options',
    );
    return (
      <Wrapper>
        <NotificationProvider placement={placement}>
          <NotificationComponent
            autoDismiss={autoDismiss}
            pauseOnHover={pauseOnHover}
            autoDismissTimeout={autoDismissTimeout}
          />
        </NotificationProvider>
      </Wrapper>
    );
  });
