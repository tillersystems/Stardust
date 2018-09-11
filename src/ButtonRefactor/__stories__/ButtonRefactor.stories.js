import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { ButtonRefactor, Icon, Theme } from '../..';

const onClickAction = action('onClick');

storiesOf('ButtonRefactor', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
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
        <ButtonRefactor ghost>Ghost</ButtonRefactor>
        <ButtonRefactor
          primary
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
        >
          Primary
        </ButtonRefactor>
        <ButtonRefactor
          light
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('light')}
        >
          Light
        </ButtonRefactor>
        <ButtonRefactor
          success
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
        >
          Success
        </ButtonRefactor>
        <ButtonRefactor
          failure
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
        >
          Failure
        </ButtonRefactor>
      </div>
    );
  })
  .add('with icons', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
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
        <ButtonRefactor ghost>
          <Icon color={Theme.palette.white} name="maximize" />
        </ButtonRefactor>
        <ButtonRefactor
          primary
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
        >
          <Icon marginRight color={Theme.palette.white} name="maximize" />
          Failure
        </ButtonRefactor>
        <ButtonRefactor
          light
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('light')}
        >
          <Icon color={Theme.palette.grey} name="maximize" />
        </ButtonRefactor>
        <ButtonRefactor
          success
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
        >
          <Icon color={Theme.palette.white} name="maximize" />
        </ButtonRefactor>
        <ButtonRefactor
          failure
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
        >
          <Icon color={Theme.palette.white} name="maximize" />
        </ButtonRefactor>
      </div>
    );
  })
  .add('Google', () => {
    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
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
        <ButtonRefactor
          isGoogle
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          disabled={disabledValue}
          onClick={() => onClickAction('Google')}
        >
          Sign In with Google
        </ButtonRefactor>
      </div>
    );
  });
