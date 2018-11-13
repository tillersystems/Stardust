import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button, ButtonGroup } from '../..';

storiesOf('ButtonGroup', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const onClickAction = action('onClick');
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const disabledValue = boolean('Disabled', false, 'State');

    return (
      <div>
        <ButtonGroup
          secondary
          big={bigValue}
          small={smallValue}
          fluid={fluidValue}
          disabled={disabledValue}
          onChange={name => onClickAction(name)}
          defaultActiveButton="ON"
        >
          <Button name="ON">ON</Button>
          <Button name="OFF">OFF</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup
          primary
          big={bigValue}
          small={smallValue}
          fluid={fluidValue}
          disabled={disabledValue}
          onChange={name => onClickAction(name)}
          defaultActiveButton="download"
        >
          <Button name="settings">Settings</Button>
          <Button name="download">Download</Button>
          <Button name="calendar">Calendar</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup
          success
          big={bigValue}
          small={smallValue}
          fluid={fluidValue}
          disabled={disabledValue}
          onChange={name => onClickAction(name)}
          defaultActiveButton="settings"
        >
          <Button name="settings">Settings</Button>
          <Button name="download">Download</Button>
          <Button name="calendar">Calendar</Button>
        </ButtonGroup>
        <br />
        <ButtonGroup
          failure
          big={bigValue}
          small={smallValue}
          fluid={fluidValue}
          disabled={disabledValue}
          onChange={name => onClickAction(name)}
          defaultActiveButton="settings"
        >
          <Button name="settings">Settings</Button>
          <Button name="download">Download</Button>
          <Button name="calendar">Calendar</Button>
        </ButtonGroup>
        <br />
      </div>
    );
  });
