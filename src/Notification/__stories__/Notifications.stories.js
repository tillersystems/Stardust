import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select, number } from '@storybook/addon-knobs';

import { NotificationProvider, useNotifications } from '../provider';
import Button from '../../Button';
import Message from '../../Message';
import Wrapper from '../../Wrapper';
import NotificationReadme from '../README.md';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

/*eslint react/prop-types:0*/
const NotificationComponent = ({ autoDismiss, autoDismissTimeout, pauseOnHover }) => {
  const { addNotification, dismissNotification, updateNotification } = useNotifications();

  const Component = ({ onClose }) => (
    <Message description="this is a message" type="success" onClose={onClose} />
  );

  const ComponentWithKey = ({ onClose }) => (
    <Message
      description="I'm an identified notification with key: 'stardust'"
      type="info"
      onClose={onClose}
    />
  );

  const UpdatedComponent = ({ onClose }) => {
    return <Message description={`I'm an updated component !`} type="warning" onClose={onClose} />;
  };

  return (
    <FlexContainer>
      <StyledButton
        appearance="success"
        size="small"
        onClick={() =>
          addNotification(Component, { autoDismiss, autoDismissTimeout, pauseOnHover })
        }
      >
        Add Notification
      </StyledButton>
      <StyledButton
        appearance="primary"
        size="small"
        onClick={() =>
          addNotification(ComponentWithKey, {
            key: 'stardust',
            autoDismiss,
            autoDismissTimeout,
            pauseOnHover,
          })
        }
      >
        Add Notification with key &quot;stardust&quot;
      </StyledButton>
      <StyledButton
        appearance="primary"
        size="small"
        onClick={() => dismissNotification('stardust')}
      >
        Remove Notification with key &quot;stardust&quot;
      </StyledButton>
      <StyledButton
        appearance="primary"
        size="small"
        onClick={() => {
          updateNotification(UpdatedComponent, {
            key: 'stardust',
            autoDismiss: true,
            autoDismissTimeout: 4000,
            pauseOnHover: true,
          });
        }}
      >
        Update Notification with key &quot;stardust&quot; and make it auto-dismissable (4000ms)
      </StyledButton>
    </FlexContainer>
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
      ['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'],
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
