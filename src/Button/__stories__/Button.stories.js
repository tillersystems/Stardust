import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { Button, Icon, Theme } from '../..';

const onClickAction = action('onClick');

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');

    const disabledValue = boolean('Disabled', false, 'State');

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: '20rem',
          rowGap: '1rem',
          justifyItems: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Button ghost>Ghost</Button>
        <Button
          primary
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
        >
          Primary
        </Button>
        <Button
          secondary
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('secondary')}
        >
          secondary
        </Button>
        <Button
          success
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
        >
          Success
        </Button>
        <Button
          failure
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
        >
          Failure
        </Button>
      </div>
    );
  })
  .add('with icons', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const positionOptions = {
      left: 'left',
      right: 'right',
    };
    const iconPositionValue = select('Icon position', positionOptions, 'left', 'Layout');
    const labelValue = boolean('Label', true, 'Layout');

    const disabledValue = boolean('Disabled', false, 'State');

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: '20rem',
          rowGap: '1rem',
          justifyItems: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Button
          ghost
          icon={labelValue ? <Icon color={Theme.palette.white} name="maximize" /> : null}
          iconPosition={iconPositionValue}
        >
          {labelValue ? 'ghost' : <Icon color={Theme.palette.white} name="maximize" />}
        </Button>
        <Button
          primary
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
          icon={labelValue ? <Icon color={Theme.palette.white} name="maximize" /> : null}
          iconPosition={iconPositionValue}
        >
          {labelValue ? 'primary' : <Icon color={Theme.palette.white} name="maximize" />}
        </Button>
        <Button
          secondary
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('secondary')}
          icon={labelValue ? <Icon color={Theme.palette.white} name="maximize" /> : null}
          iconPosition={iconPositionValue}
        >
          {labelValue ? 'secondary' : <Icon color={Theme.palette.white} name="maximize" />}
        </Button>
        <Button
          success
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
          icon={labelValue ? <Icon color={Theme.palette.white} name="maximize" /> : null}
          iconPosition={iconPositionValue}
        >
          {labelValue ? 'success' : <Icon color={Theme.palette.white} name="maximize" />}
        </Button>
        <Button
          failure
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
          icon={labelValue ? <Icon color={Theme.palette.white} name="maximize" /> : null}
          iconPosition={iconPositionValue}
        >
          {labelValue ? 'failure' : <Icon color={Theme.palette.white} name="maximize" />}
        </Button>
      </div>
    );
  })
  .add('Google', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');

    const disabledValue = boolean('Disabled', false, 'State');

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto',
          gridTemplateColumns: '20rem',
          rowGap: '1rem',
          justifyItems: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Button
          isGoogle
          fluid={fluidValue}
          big={bigValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('Google')}
        >
          Sign In with Google
        </Button>
      </div>
    );
  });
