import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { action } from '@storybook/addon-actions';

import { Button, Icon, Theme } from '../..';

const onClickAction = action('onClick');

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .add('with properties', () => {
    const invertedValue = boolean('Inverted', false, 'Appearance');
    const roundedValue = boolean('Rounded', false, 'Appearance');

    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const tinyValue = boolean('Tiny', false, 'Layout');

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
        <Button ghost>Default</Button>
        <Button
          primary
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
        >
          Primary
        </Button>
        <Button
          secondary
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('secondary')}
        >
          Secondary
        </Button>
        <Button
          light
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('light')}
        >
          Light
        </Button>
        <Button
          success
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
        >
          Success
        </Button>
        <Button
          failure
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
        >
          Failure
        </Button>
      </div>
    );
  })
  .add('with icons', () => {
    const invertedValue = boolean('Inverted', false, 'Appearance');
    const roundedValue = boolean('Rounded', false, 'Appearance');

    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const tinyValue = boolean('Tiny', false, 'Layout');

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
        <Button ghost>
          <Icon color={Theme.palette.white} name="maximize" />
        </Button>
        <Button
          primary
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('primary')}
        >
          <Icon color={Theme.palette.white} name="maximize" />
        </Button>
        <Button
          secondary
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('secondary')}
        >
          <Icon color={Theme.palette.grey} name="maximize" />
        </Button>
        <Button
          light
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('light')}
        >
          <Icon color={Theme.palette.grey} name="maximize" />
        </Button>
        <Button
          success
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('success')}
        >
          <Icon color={Theme.palette.white} name="maximize" />
        </Button>
        <Button
          failure
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('failure')}
        >
          <Icon color={Theme.palette.white} name="maximize" />
        </Button>
      </div>
    );
  })
  .add('Google', () => {
    const invertedValue = boolean('Inverted', false, 'Appearance');
    const roundedValue = boolean('Rounded', false, 'Appearance');

    const fluidValue = boolean('Fluid', false, 'Layout');
    const bigValue = boolean('Big', false, 'Layout');
    const mediumValue = boolean('Medium', false, 'Layout');
    const smallValue = boolean('Small', false, 'Layout');
    const tinyValue = boolean('Tiny', false, 'Layout');

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
          inverted={invertedValue}
          rounded={roundedValue}
          fluid={fluidValue}
          big={bigValue}
          medium={mediumValue}
          small={smallValue}
          tiny={tinyValue}
          disabled={disabledValue}
          onClick={() => onClickAction('Google')}
        >
          Sign In with Google
        </Button>
      </div>
    );
  });
